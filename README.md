# Hardhat Edge Android (Bionic ARM64)

A native Android (Bionic) ARM64 build of the Hardhat Rust execution engine (EDR).

## The Problem

Modern versions of the [Hardhat](https://hardhat.org/) smart contract development framework rely on a high-performance, Rust-based execution engine called EDR. By default, the Nomic Foundation distributes pre-compiled `.node` binaries for standard Linux (`glibc`), macOS, and Windows. 

If you attempt to run Hardhat natively on an Android device using Termux, Node.js will panic. Android uses the lightweight Bionic C-library, which creates an ABI mismatch (e.g., missing `libc++_shared.so` errors) when standard Linux binaries try to execute.

## The Solution

This repository provides a custom cross-compiled version of the Hardhat EDR engine, built directly from source using the Android NDK and `napi-rs`. 

The `edr.android-arm64.node` file in this repository is dynamically linked against Android's Bionic architecture. It allows you to run Hardhat at full speed directly on your mobile device without relying on pure-JavaScript fallbacks, remote servers, or memory-patching older binaries.

## Requirements

* An Android device running Termux (64-bit ARM / `aarch64`)
* Node.js (Tested on v24 LTS)
* A local Hardhat project

## Installation

1. Download the `edr.android-arm64.node` file from this repository.
2. Navigate to your local Web3 project directory.
3. Locate the Nomic Foundation EDR package inside your `node_modules` folder. The exact path can vary, but you can find it by running: `find ./node_modules -type d -name "@nomicfoundation"`
4. Copy the downloaded `.node` file into the appropriate EDR binary directory (usually inside `node_modules/hardhat/node_modules/@nomicfoundation/edr/` or similar).
5. Run your Hardhat node or compile your contracts as usual. Node.js will automatically detect and utilize the native Android ARM64 binary.

## Why build this?

This binary was originally forged to support the localized Web3 infrastructure of the Titan Stack, pushing the limits of decentralized development directly on edge devices. Building Web3 shouldn't be tethered to a desktop.
