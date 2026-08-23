# Vertcoin One Click Miner

[![macOS Apple Silicon](https://img.shields.io/badge/macOS-Apple%20Silicon-000000?logo=apple&logoColor=white)](https://github.com/sumcoinlabs/one-click-miner-vnext/releases)
[![ARM64](https://img.shields.io/badge/macOS-arm64-blue)](https://github.com/sumcoinlabs/one-click-miner-vnext)
[![Wails](https://img.shields.io/badge/Wails-v2-CF3C3C)](https://wails.io/)
[![Go](https://img.shields.io/badge/Go-powered-00ADD8?logo=go&logoColor=white)](https://go.dev/)
[![Vue](https://img.shields.io/badge/Vue-2-4FC08D?logo=vuedotjs&logoColor=white)](https://vuejs.org/)
[![Verthash](https://img.shields.io/badge/Mining-Verthash-green)](https://vertcoin.org/)
[![GitHub Release](https://img.shields.io/github/v/release/sumcoinlabs/one-click-miner-vnext?include_prereleases)](https://github.com/sumcoinlabs/one-click-miner-vnext/releases)
[![License](https://img.shields.io/badge/license-MIT-blue)](LICENSE)

**Simple Vertcoin GPU mining for Windows, Linux, and now native macOS on Apple Silicon.**

This SumcoinLabs fork extends the Vertcoin One Click Miner with native macOS support, Apple Silicon GPU detection, Wails v2, adaptive Apple GPU tuning, and automatic integration with the SumcoinLabs macOS build of VerthashMiner.

---

## Overview

Vertcoin One Click Miner, commonly referred to as **OCM**, is designed to make mining Vertcoin accessible without requiring users to manually configure a wallet, GPU miner, Verthash dataset, mining pool, or command-line environment.

OCM combines the complete mining workflow into a single desktop application.

The application handles:

- Built-in Vertcoin wallet creation
- Password-protected local wallet storage
- GPU detection
- Miner selection
- Miner downloads
- SHA-256 integrity verification
- Miner extraction
- Verthash data-file preparation
- Mining pool configuration
- Miner process management
- Live hashrate reporting
- Wallet balance information
- Start and Stop Mining controls

The SumcoinLabs fork adds a complete native mining path for modern Apple Silicon Macs.

---

## macOS Apple Silicon Support

The macOS implementation has been validated end-to-end on:

```text
Apple M1 Pro
macOS Sequoia 15.6.1
darwin/arm64
Apple OpenCL
```

The complete workflow has been tested successfully:

```text
Vertcoin One Click Miner.app
        ↓
Built-in Vertcoin wallet
        ↓
Apple Silicon GPU detection
        ↓
APPLE GPU platform matching
        ↓
Native macOS VerthashMiner selection
        ↓
Miner download
        ↓
SHA-256 verification
        ↓
Archive extraction
        ↓
verthash.dat preparation
        ↓
Automatic pool configuration
        ↓
Adaptive Apple GPU configuration
        ↓
Apple OpenCL mining
        ↓
Live hashrate displayed in OCM
        ↓
Accepted Vertcoin shares
```

The Apple Silicon implementation has successfully submitted accepted Vertcoin shares to a live Stratum mining pool.

---

## Features

### Mining

- Automatic GPU detection
- Automatic compatible miner selection
- Automatic VerthashMiner download
- SHA-256 miner verification
- Automatic miner extraction
- Automatic configuration generation
- Automatic Verthash dataset preparation
- Stratum pool mining
- P2Pool support inherited from OCM
- Live hashrate reporting
- Start Mining control
- Stop Mining control

### Wallet

- Built-in Vertcoin wallet
- Local wallet generation
- Password-protected encrypted key storage
- Vertcoin payout address generation
- Wallet balance display
- Pool payout tracking

### GPU Support

- Apple Silicon
- AMD
- NVIDIA
- Intel GPU detection
- OpenCL
- CUDA where supported by the underlying miner

### macOS

- Native `darwin/arm64` application
- Native `.app` bundle
- Apple GPU detection
- Apple OpenCL mining
- Adaptive Apple GPU tuning
- Native Darwin miner process management
- Portable VerthashMiner package
- Wails v2 desktop runtime

---

## Built-In Vertcoin Wallet

OCM includes a built-in Vertcoin wallet so a user does not need to configure a separate payout wallet before beginning to mine.

On first launch, the application asks the user to create a wallet password.

OCM then generates the wallet key material locally and derives the Vertcoin receiving address used for mining payouts.

On macOS, OCM application data is stored under:

```text
~/Library/Application Support/vertcoin-ocm/
```

The encrypted wallet keyfile is stored locally.

Wallet passwords and private keys should never be shared with a mining pool.

A mining pool requires only the public Vertcoin receiving address.

---

## Apple Silicon GPU Detection

Apple Silicon GPUs are detected automatically through the existing OCM hardware-discovery system.

Example:

```text
Apple M1 Pro
```

Apple GPUs are represented internally by the OCM GPU type:

```text
APPLE
```

The GPU matching system recognizes Apple hardware using the Apple GPU platform and selects a compatible `darwin` miner.

An Apple miner manifest entry uses:

```json
{
  "platform": "darwin",
  "gpuplatform": "APPLE"
}
```

This allows macOS Apple Silicon miners to coexist with the existing Windows and Linux miner definitions.

---

## SumcoinLabs VerthashMiner

The Apple Silicon mining engine used by OCM is maintained separately in the SumcoinLabs VerthashMiner repository:

[SumcoinLabs VerthashMiner](https://github.com/sumcoinlabs/VerthashMiner)

The SumcoinLabs VerthashMiner fork adds:

- Native macOS ARM64 compilation
- Apple Silicon GPU support
- Apple OpenCL compatibility
- macOS-safe Verthash result validation
- Stratum startup race protection
- Portable macOS packaging
- Adaptive Apple GPU tuning
- One Click Miner integration

The miner has been validated by submitting accepted Vertcoin shares from an Apple M1 Pro.

---

## Automatic Miner Installation

OCM manages VerthashMiner automatically.

When a compatible GPU is detected, the application can:

1. Identify the correct miner package
2. Download the package
3. Calculate its SHA-256 checksum
4. Compare the checksum against the miner manifest
5. Reject an invalid package
6. Remove an obsolete unpacked copy
7. Extract the verified miner
8. Generate its configuration
9. Start the mining process

This means an ordinary user does not need to manually install or configure VerthashMiner.

---

## Miner Integrity Verification

The miner manifest contains a SHA-256 checksum for each supported miner package.

For the Apple Silicon miner, OCM downloads the SumcoinLabs macOS release and verifies the archive before execution.

The workflow is:

```text
Download miner
      ↓
Calculate SHA-256
      ↓
Compare with miners.json
      ↓
Checksum matches
      ↓
Extract package
      ↓
Allow execution
```

This protects against corrupted or unexpectedly modified miner downloads.

---

## Portable macOS Miner

The Apple Silicon VerthashMiner package is designed to operate without requiring an ordinary user to install Homebrew.

The package contains:

```text
VerthashMiner

kernels/
├── sha3_512_256.cl
├── sha3_512_precompute.cl
└── verthash.cl

lib/
├── libjansson.4.dylib
├── libssl.3.dylib
└── libcrypto.3.dylib
```

Non-system dynamic libraries are bundled with the miner.

System components such as Apple's OpenCL framework remain provided by macOS.

---

## Verthash Data File

The Verthash algorithm requires a static dataset commonly named:

```text
verthash.dat
```

The file is approximately 1.2 GB.

OCM automatically handles its creation and verification.

On the first mining run, the interface may display:

```text
Verifying / creating Verthash data file...
```

The first initialization can take some time.

Once the file has been created, subsequent mining sessions start substantially faster.

---

## Apple Silicon Performance

Development testing was performed on an Apple M1 Pro.

Measured results were approximately:

```text
WorkSize 256        ~59 kH/s
WorkSize 1024       ~79 kH/s
WorkSize 4096       ~80 kH/s
WorkSize 16384      ~80.6 kH/s
Adaptive WorkSize   ~80.7 kH/s
```

The initial compatibility configuration used a fixed WorkSize of:

```text
w256
```

Although stable, this left substantial performance unused.

Testing showed that adaptive configuration achieved approximately **80 kH/s**, representing a significant improvement over the initial conservative setting.

---

## Adaptive Apple GPU Tuning

OCM now uses the following configuration for Apple Silicon:

```text
0:w0:b250:o100:m0:t0
```

The parameters are:

- `w0` — Enable adaptive WorkSize
- `b250` — Target approximately 250 ms per GPU batch
- `o100` — Target 100% GPU occupancy
- `m0` — Disable legacy monitoring unsupported on Apple GPUs
- `t0` — Disable miner-side temperature limiting

Adaptive WorkSize allows VerthashMiner to dynamically select an appropriate amount of work for the detected GPU.

This is preferable to hardcoding one WorkSize because Apple Silicon hardware varies substantially between:

- Base chips
- Pro chips
- Max chips
- Ultra chips
- Different Apple Silicon generations

---

## Tested Apple Hardware

Currently validated:

- Apple M1 Pro

Expected to use the same Apple OpenCL mining path:

- Apple M1
- Apple M1 Pro
- Apple M1 Max
- Apple M1 Ultra
- Apple M2 family
- Apple M3 family
- Apple M4 family
- Future compatible Apple Silicon systems

Individual models should still be independently tested.

---

## Intel Mac Support

Intel macOS support is planned.

The currently validated macOS application and miner target:

```text
darwin/arm64
```

A native Intel:

```text
darwin/amd64
```

version has not yet been validated.

Intel support will require an appropriate x86_64 macOS VerthashMiner build and architecture-aware miner selection.

---

## Wails v2 Migration

The original One Click Miner was built using Wails v1.

Modern macOS support required migrating the desktop application to **Wails v2**.

The migration includes:

- Wails v2 application startup
- Wails v2 application lifecycle
- Modern frontend asset embedding
- Generated JavaScript bindings
- Generated Go bindings
- Updated frontend initialization
- Updated backend event delivery
- Native macOS application packaging
- ARM64 application builds
- Updated frontend-to-Go communication

This allows the existing Vue-based OCM interface to run correctly on modern macOS systems.

---

## Wails Runtime Compatibility

The legacy frontend expected some runtime functionality under:

```javascript
window.wails
```

Wails v2 owns its own `window.wails` runtime object.

Replacing that object caused failures involving Wails callbacks, events, drag handling, and frontend communication.

The SumcoinLabs migration therefore maintains a separate compatibility bridge for the older OCM frontend rather than replacing Wails v2's internal runtime.

The frontend accesses backend bindings while Wails retains control of its native runtime implementation.

---

## Native macOS Process Management

The original OCM contained platform-specific miner process behavior for Windows and Linux.

Native Darwin support has been added.

On macOS, OCM can:

- Start VerthashMiner
- Supply generated command-line arguments
- Capture miner output
- Parse hashrate
- Report mining status
- Stop the miner
- Restart mining
- Manage the process directly from the GUI

No Windows-specific background process configuration is required on macOS.

---

## Apple Miner Command

For Apple Silicon, OCM launches VerthashMiner with the generated configuration file and adaptive GPU parameters.

The effective configuration includes:

```text
--cl-devices 0:w0:b250:o100:m0:t0
```

The miner configuration file supplies the remaining settings such as:

- Verthash data-file location
- Mining protocol
- Pool
- Username / payout address
- Password where required

---

## Hashrate Monitoring

OCM reads VerthashMiner output and reports the active hashrate directly in the graphical interface.

Example Apple M1 Pro output:

```text
~80 kH/s
```

The exact value varies depending on:

- Apple Silicon model
- GPU core count
- System temperature
- Power mode
- macOS version
- Background GPU workloads
- Memory pressure

Performance figures are development measurements rather than guaranteed specifications.

---

## Accepted Share Validation

The macOS implementation has been tested against a real Vertcoin Stratum pool.

The Apple M1 Pro successfully produced accepted shares while running through the SumcoinLabs VerthashMiner build.

Example miner behavior:

```text
Stratum difficulty set
      ↓
Apple GPU hashing
      ↓
Verthash work completed
      ↓
Share submitted
      ↓
accepted: 1/1
```

This validates more than GPU kernel execution alone.

It confirms the complete path from OCM through VerthashMiner to successful Vertcoin pool share submission.

---

## Supported Platforms

### macOS

Currently validated:

```text
Apple Silicon / ARM64
```

Tested development environment:

```text
Apple M1 Pro
macOS Sequoia 15.6.1
```

### Windows

The existing Windows functionality remains part of the project.

### Linux

The existing Linux functionality remains part of the project.

---

## Getting Started

### macOS Apple Silicon

Download or build:

```text
Vertcoin One Click Miner.app
```

Launch the application.

On first use:

1. Create a wallet password
2. Confirm the password
3. Allow OCM to create the wallet
4. Allow Verthash data preparation to complete
5. Click **Start Mining**

OCM handles miner installation and configuration automatically.

---

## Starting Mining

When **Start Mining** is selected, OCM performs the mining startup workflow.

```text
Start Mining
      ↓
Detect GPUs
      ↓
Find compatible miner
      ↓
Verify/download miner
      ↓
Extract miner
      ↓
Prepare Verthash data
      ↓
Generate miner configuration
      ↓
Launch VerthashMiner
      ↓
Connect to mining pool
      ↓
Display hashrate
```

---

## Stopping Mining

Selecting **Stop Mining** terminates the active mining process.

The following remain available for future sessions:

- Wallet
- Wallet configuration
- Verthash data file
- Miner archive
- Application settings

This makes subsequent starts significantly faster than the first run.

---

## Building on macOS Apple Silicon

### Requirements

A typical development environment requires:

- macOS
- Xcode
- Xcode Command Line Tools
- Go
- Node.js
- npm
- Wails v2

Install Wails v2:

```bash
go install github.com/wailsapp/wails/v2/cmd/wails@v2.13.0
```

---

## Clone

```bash
git clone https://github.com/sumcoinlabs/one-click-miner-vnext.git
cd one-click-miner-vnext
```

For active development, use the desired development branch.

For the merged macOS version:

```bash
git checkout master
```

---

## Frontend Dependencies

Install the existing Vue frontend dependencies:

```bash
cd frontend
npm install
cd ..
```

The existing Vue/Webpack frontend may require Node's legacy OpenSSL provider when using modern Node releases:

```bash
export NODE_OPTIONS=--openssl-legacy-provider
```

---

## Run Go Tests

```bash
go test ./...
```

Tests should complete successfully before producing a release build.

---

## Build the macOS Application

Set the frontend compatibility environment variable:

```bash
export NODE_OPTIONS=--openssl-legacy-provider
```

Build with Wails:

```bash
wails build
```

The resulting application is created under:

```text
build/bin/Vertcoin One Click Miner.app
```

---

## Debug Build

For development and troubleshooting:

```bash
export NODE_OPTIONS=--openssl-legacy-provider
wails build -debug
```

This enables a development-oriented application build.

---

## Launch From Terminal

To retain backend logs while testing:

```bash
"build/bin/Vertcoin One Click Miner.app/Contents/MacOS/vertcoin-ocm"
```

This is particularly useful while working on:

- Miner downloads
- GPU detection
- Miner configuration
- Pool selection
- Wallet initialization
- Hashrate parsing
- macOS process handling

---

## Launch Normally

Launch the application using macOS LaunchServices:

```bash
open "build/bin/Vertcoin One Click Miner.app"
```

The `.app` may also be opened normally through Finder.

---

## Verify ARM64 Architecture

After building:

```bash
file "build/bin/Vertcoin One Click Miner.app/Contents/MacOS/vertcoin-ocm"
```

A native Apple Silicon build should report an ARM64 Mach-O executable.

Example:

```text
Mach-O 64-bit executable arm64
```

---

## Application Data on macOS

OCM stores its macOS application data under:

```text
~/Library/Application Support/vertcoin-ocm/
```

Depending on application state, this can include files such as:

```text
keyfile.hex
verthash.dat
verthash-miner.conf
miners/
```

The exact contents may change as OCM continues to be developed.

---

## Miner Storage

Automatically downloaded miners are maintained under the OCM application data directory.

A verified miner may be unpacked into a checksum-specific directory.

Conceptually:

```text
miners/
├── downloaded miner archive
└── unpacked-SHA256/
    ├── VerthashMiner
    ├── kernels/
    └── lib/
```

Using checksum-specific paths allows OCM to distinguish between miner builds.

---

## Miner Manifest

OCM uses `miners.json` to determine which mining binary should be used for a particular platform and GPU family.

A macOS Apple Silicon definition includes:

```json
{
  "platform": "darwin",
  "gpuplatform": "APPLE",
  "mainExecutableName": "VerthashMiner",
  "closedSource": false
}
```

The manifest also contains:

- Download URL
- SHA-256 checksum
- Supported block range
- Testnet status
- Multi-GPU capability

---

## SumcoinLabs Miner Infrastructure

The SumcoinLabs fork uses SumcoinLabs-controlled sources for the macOS mining integration.

The miner is distributed from:

[SumcoinLabs VerthashMiner Releases](https://github.com/sumcoinlabs/VerthashMiner/releases)

The OCM source is maintained at:

[SumcoinLabs One Click Miner](https://github.com/sumcoinlabs/one-click-miner-vnext)

This keeps the macOS OCM implementation and its matching macOS VerthashMiner build under the same development organization.

---

## First-Run Behavior

A new installation may need to perform several operations before mining begins.

These can include:

1. Wallet creation
2. Keyfile encryption
3. GPU detection
4. Pool selection
5. Miner manifest retrieval
6. Miner download
7. SHA-256 verification
8. Miner extraction
9. Verthash data creation
10. Configuration generation
11. Miner startup

The Verthash dataset is the most time-consuming first-run operation.

Future sessions can reuse the generated data.

---

## Current macOS Status

### Working

- Native ARM64 application
- Wails v2 application runtime
- Vue frontend
- Built-in Vertcoin wallet
- Wallet initialization
- Wallet persistence
- Apple GPU detection
- Apple M1 Pro detection
- Apple GPU classification
- `darwin/APPLE` miner matching
- SumcoinLabs miner manifest
- Automatic miner download
- SHA-256 miner verification
- Automatic miner extraction
- Portable VerthashMiner package
- Verthash data generation
- Verthash data reuse
- VerthashMiner configuration generation
- Apple OpenCL mining
- Adaptive WorkSize
- Real Stratum connectivity
- Live hashrate display
- Accepted Vertcoin shares
- Start Mining
- Stop Mining

### Planned

- Intel Mac `darwin/amd64` support
- Universal or architecture-aware macOS distribution
- Additional Apple Silicon hardware testing
- Apple Developer ID signing
- Apple notarization
- Automated macOS release builds
- Automated packaging
- Updated SumcoinLabs updater
- macOS-native node latency checks
- Cleanup of inherited first-run setting warnings

---

## Known macOS Notes

### Raw ICMP P2Pool Checks

The inherited P2Pool node-selection implementation attempts to perform raw ICMP latency checks.

Ordinary macOS applications generally cannot create raw ICMP sockets without additional privileges.

Development logs may therefore contain messages similar to:

```text
listen ip4:icmp : socket: operation not permitted
```

This does not prevent GPU mining.

OCM can fall back to another node selection path.

A future macOS implementation should use an unprivileged TCP or HTTP latency measurement instead.

---

## First-Run Setting Messages

Some inherited settings may not yet exist when OCM is run for the first time.

Development logs can contain messages such as:

```text
Error in getSetting(testnet): not found
Error in getSetting(debugging): not found
Error in getSetting(enableIntegrated): not found
```

These conditions are currently non-fatal.

The application continues using its default behavior.

Future cleanup should initialize default settings without logging them as errors.

---

## Integrated GPU Setting

The inherited **Use Integrated GPU** option was primarily designed for conventional systems with separate integrated and discrete GPUs.

Apple Silicon uses Apple's unified GPU architecture.

Apple GPUs are identified separately by OCM as:

```text
APPLE
```

The legacy integrated-GPU option should therefore not be interpreted as a complete Apple GPU enable or disable setting.

Future macOS UI work may clarify or rename this option.

---

## Application Signing

Development builds currently use development or ad-hoc signing behavior.

For polished general-public macOS distribution, future releases should use:

- Apple Developer ID signing
- Hardened Runtime where appropriate
- Apple notarization
- Stapled notarization ticket

Without Developer ID notarization, Gatekeeper may display additional warnings for an application downloaded from the Internet.

---

## macOS Release Packaging

A release `.app` can be produced using:

```bash
export NODE_OPTIONS=--openssl-legacy-provider
wails build
```

The resulting application:

```text
build/bin/Vertcoin One Click Miner.app
```

can be packaged using macOS `ditto`:

```bash
ditto -c -k \
  --sequesterRsrc \
  --keepParent \
  "build/bin/Vertcoin One Click Miner.app" \
  "build/bin/Vertcoin-One-Click-Miner-macOS-arm64.zip"
```

Generate a SHA-256 checksum with:

```bash
shasum -a 256 \
  "build/bin/Vertcoin-One-Click-Miner-macOS-arm64.zip"
```

---

## Security

### Wallet Security

The built-in wallet is stored locally.

Never share:

- Wallet password
- Private key
- Wallet keyfile
- Seed or private key material

A mining pool requires only your public Vertcoin receiving address.

### Miner Security

Automatically downloaded miner archives are checked against the SHA-256 values stored in the OCM miner manifest before execution.

Users should obtain OCM and VerthashMiner only from trusted project sources.

---

## Project Architecture

```text
Vertcoin One Click Miner
        │
        ├── User Interface
        │       └── Vue
        │
        ├── Desktop Runtime
        │       └── Wails v2
        │
        ├── Go Backend
        │       ├── Wallet
        │       ├── GPU Detection
        │       ├── Miner Management
        │       ├── Pool Management
        │       ├── Verthash Data
        │       └── Hashrate Monitoring
        │
        └── VerthashMiner
                ├── Apple OpenCL
                ├── AMD OpenCL
                └── NVIDIA OpenCL / CUDA
```

---

## Apple Silicon Mining Architecture

```text
Vertcoin One Click Miner.app
        ↓
Wails v2
        ↓
Go Backend
        ↓
Apple GPU Detection
        ↓
GPUTypeApple
        ↓
darwin / APPLE Miner Manifest
        ↓
SumcoinLabs VerthashMiner
        ↓
Apple OpenCL
        ↓
Adaptive WorkSize
        ↓
Verthash
        ↓
Stratum Pool
        ↓
Accepted Vertcoin Shares
```

---

## Development Workflow

When modifying the Apple mining path, changes should generally be tested in this order:

1. Build and test VerthashMiner directly
2. Confirm Apple GPU detection
3. Confirm stable hashing
4. Confirm accepted shares
5. Produce a portable miner package
6. Verify bundled dependencies
7. Generate SHA-256
8. Update OCM `miners.json`
9. Build OCM
10. Verify automatic miner download
11. Verify extraction
12. Verify Verthash preparation
13. Verify GUI hashrate
14. Verify accepted shares through OCM

This separates miner-level problems from OCM integration problems.

---

## Troubleshooting

### No Apple GPU Detected

Verify the Mac is using Apple Silicon.

From Terminal:

```bash
uname -m
```

Expected:

```text
arm64
```

The SumcoinLabs macOS support has currently been validated on Apple Silicon rather than Intel Macs.

---

### Miner Downloads but Does Not Run

Confirm the downloaded package contains:

```text
VerthashMiner
kernels/
lib/
```

The OpenCL kernels must remain available relative to the executable.

---

### Verthash Preparation Takes a Long Time

The first run must prepare approximately 1.2 GB of Verthash data.

Allow the process to complete.

The resulting file can be reused on future mining sessions.

---

### Hashrate Is Much Lower Than Expected on Apple Silicon

Confirm OCM is launching VerthashMiner with:

```text
0:w0:b250:o100:m0:t0
```

The initial development setting:

```text
w256
```

was deliberately conservative and substantially slower on the tested M1 Pro.

---

### P2Pool Ping Permission Errors

Messages involving:

```text
socket: operation not permitted
```

can be caused by the inherited raw ICMP node-latency implementation on macOS.

This is separate from Apple GPU mining and does not by itself mean VerthashMiner has failed.

---

## Original One Click Miner

This project is based on the Vertcoin One Click Miner and One Click Miner Next projects.

The original software was created to provide a simplified way for users to begin mining Vertcoin with minimal configuration.

The SumcoinLabs fork preserves that goal while extending the software to modern Apple Silicon Macs.

---

## Acknowledgments

### Vertcoin One Click Miner

The original Vertcoin One Click Miner and One Click Miner Next projects were created by contributors to the Vertcoin ecosystem.

Their work established the core concepts used by this project, including:

- Simplified mining setup
- Built-in wallet integration
- GPU detection
- Miner management
- Mining pool integration
- Verthash preparation
- Hashrate reporting
- Desktop mining controls

The SumcoinLabs fork builds directly upon that open-source work.

### VerthashMiner

The underlying VerthashMiner project was originally developed by **CryptoGraphics**.

The SumcoinLabs VerthashMiner fork provides the native macOS and Apple Silicon mining implementation used by this application.

See:

[SumcoinLabs VerthashMiner](https://github.com/sumcoinlabs/VerthashMiner)

### macOS and Apple Silicon Contributions

**Special acknowledgment to Ty Jacobsen for the macOS and Apple Silicon contributions to this project.**

These contributions include:

- Native macOS One Click Miner development
- Apple Silicon GPU support
- Apple GPU detection and classification
- Native `darwin/arm64` testing
- Wails v1 to Wails v2 migration work
- Wails frontend and runtime compatibility work
- Native Darwin process support
- Apple Silicon VerthashMiner integration
- SumcoinLabs miner manifest integration
- Miner packaging and distribution integration
- SHA-256 package validation testing
- Apple OpenCL compatibility testing
- Apple GPU performance testing
- Adaptive WorkSize tuning
- Built-in wallet validation on macOS
- Verthash data generation validation
- End-to-end OCM mining validation
- Real Vertcoin Stratum pool testing
- Accepted-share validation on Apple M1 Pro hardware

The macOS development effort established a complete working mining path from launching the One Click Miner application through successful Vertcoin share submission using an Apple Silicon GPU.

### Vertcoin Community

Thanks to the Vertcoin developers and community for the Verthash algorithm, original One Click Miner, VerthashMiner ecosystem, mining infrastructure, documentation, and continued open-source development.

### SumcoinLabs

SumcoinLabs maintains this fork and the macOS compatibility work required for Apple Silicon support.

---

## License

Vertcoin One Click Miner is distributed under the MIT License.

See [LICENSE](LICENSE) for the complete license terms.

VerthashMiner is a separate project and remains subject to its applicable GNU General Public License terms.

Original copyright notices and attribution remain applicable to their respective projects.

---

## Related Projects

- [Vertcoin](https://vertcoin.org)
- [SumcoinLabs VerthashMiner](https://github.com/sumcoinlabs/VerthashMiner)
- [SumcoinLabs VerthashMiner Releases](https://github.com/sumcoinlabs/VerthashMiner/releases)
- [SumcoinLabs One Click Miner Releases](https://github.com/sumcoinlabs/one-click-miner-vnext/releases)

---

## Vertcoin Mining on Apple Silicon

```text
One Click Miner
      ↓
Built-in VTC Wallet
      ↓
Apple Silicon GPU
      ↓
Apple OpenCL
      ↓
Adaptive VerthashMiner
      ↓
Verthash
      ↓
Mining Pool
      ↓
Accepted VTC Shares
```

**Mine Vertcoin. One click. Now on Apple Silicon.**
