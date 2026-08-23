//go:build darwin
// +build darwin

package util

import "os/exec"

func PrepareBackgroundCommand(cmd *exec.Cmd) {
	// Nothing required on macOS.
}
