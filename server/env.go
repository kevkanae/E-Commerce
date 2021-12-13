package main

import (
	"fmt"
	"github.com/kevkanae/e-com-use-kart/server/utils"
	"os"
)

func ENV() {
	err1 := os.Setenv("KONNICHIWA", "KamiWaJinseiDes")
	err2 := os.Setenv("MONGOURI", "mongodb+srv://kevkanae:crysis123@cluster0.etamm.mongodb.net/ecom?retryWrites=true&w=majority")

	if err1 != nil {
		fmt.Println(utils.Wrap(err1, "Couldn't Set Hash Key ENV"))
		return
	}
	if err2 != nil {
		fmt.Println(utils.Wrap(err2, "Couldn't Set Mongo ENV"))
		return
	}
}
