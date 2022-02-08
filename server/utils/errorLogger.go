package utils

import "fmt"

type WrappedError struct {
	Message string
	Err     error
}

func (w *WrappedError) Error() string {
	return fmt.Sprintf("\n %s: %v \n", w.Message, w.Err)
}

func Wrap(err error, info string) *WrappedError {
	return &WrappedError{
		Message: info,
		Err:     err,
	}
}
