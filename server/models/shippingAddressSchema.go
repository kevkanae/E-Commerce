package models

type ShippingAddress struct {
	FullName   string
	Address    int
	City       string
	PostalCode int
	Country    string
	Location   struct {
		Lat             string
		Lng             string
		Address         string
		Name            string
		Vicinity        string
		GoogleAddressId string
	}
}
