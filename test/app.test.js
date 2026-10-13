// Integration test: mounts the built app (dist/assets) in jsdom and drives
// it through real button clicks and keyboard events.
// Run with `npm test` (which builds first).

import test from "node:test";
import assert from "node:assert/strict";
import { readdirSync } from "node:fs";
import { JSDOM } from "jsdom";

const dom = new JSDOM(
    '<!doctype html><html><body><div id="root"></div></body></html>',
    { url: "http://localhost/" }
);
globalThis.window = dom.window;
globalThis.document = dom.window.document;
globalThis.HTMLElement = dom.window.HTMLElement;
globalThis.KeyboardEvent = dom.window.KeyboardEvent;
globalThis.MutationObserver = dom.window.MutationObserver;

const assets = new URL("../dist/assets/", import.meta.url);
const bundle = readdirSync(assets).find((f) => /^index-.*\.js$/.test(f));
assert.ok(bundle, "no built bundle found in dist/assets — run `npm run build` first");
await import(new URL(bundle, assets).href);

const tick = () => new Promise((resolve) => setTimeout(resolve, 0));

// top display shows the full operation, bottom display the current operand
const display = () => document.querySelectorAll(".display-container .text")[0].textContent;
const input = () => document.querySelectorAll(".display-container .text")[1].textContent;

const click = async (id) => {
    document.getElementById(id).click();
    await tick();
};
const pressKey = async (key) => {
    // like in a browser, keydown targets the focused element
    const target = document.activeElement ?? document.body;
    target.dispatchEvent(new KeyboardEvent("keydown", { key, bubbles: true }));
    await tick();
};
const clear = () => click("clear");

test("paren buttons build an expression and calculate", async () => {
    await clear();
    await click("_2");
    await click("open-paren");
    await click("_3");
    await click("add");
    await click("_4");
    await click("close-paren");
    assert.equal(display(), "2*(3+4"); // implicit * after the digit
    assert.equal(input(), ""); // nothing being typed after ")"
    await click("equals");
    assert.equal(display(), "14");
});

test("backspace trims the expression, derived input follows", async () => {
    await clear();
    await click("_1");
    await click("_2");
    await click("add");
    await click("_3");
    assert.equal(display(), "12+3");
    assert.equal(input(), "3");
    await click("backspace");
    assert.equal(display(), "12+");
    assert.equal(input(), "");
    await click("backspace");
    await click("backspace");
    assert.equal(display(), "1");
});

test("division by zero shows ERROR and typing recovers", async () => {
    await clear();
    await click("_5");
    await click("divide");
    await click("_0");
    await click("equals");
    assert.equal(display(), "ERROR");
    await click("_7");
    assert.equal(display(), "7");
});

test("physical keyboard works, even while a button holds focus", async () => {
    await clear();
    document.getElementById("clear").focus();
    await pressKey("8");
    assert.equal(display(), "8"); // digits are global shortcuts
    await pressKey("+");
    await pressKey("(");
    await pressKey("2");
    assert.equal(display(), "8+(2");
    document.activeElement.blur();
    await pressKey("Enter"); // auto-closes the paren
    assert.equal(display(), "10");
});

test("Escape clears, ANS recalls the last result", async () => {
    await clear();
    await click("_2");
    await click("multiply");
    await click("_3");
    await click("equals");
    assert.equal(display(), "6");
    await pressKey("Escape");
    assert.equal(display(), "");
    await click("ans");
    assert.equal(display(), "6");
});
