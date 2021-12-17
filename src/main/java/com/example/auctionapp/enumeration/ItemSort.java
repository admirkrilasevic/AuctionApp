package com.example.auctionapp.enumeration;

public enum ItemSort {
    ENDDATE("endDate"),
    STARTDATE("startDate"),
    ALPHABETICAL("name"),
    PRICE("startingPrice");

    String variableName;

    ItemSort(String variableName){
        this.variableName = variableName;
    }

    @Override
    public String toString(){
        return variableName;
    }
}
