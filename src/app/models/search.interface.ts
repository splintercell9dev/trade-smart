/* eslint-disable @typescript-eslint/naming-convention */
export interface SearchRequest {
    code: number;
    list: List[];
}

export interface List {
    _id:             string;
    name:            string;
    symbol:          string;
    YFSymbol:        string;
    price:           number;
    prevClose:       number;
    difference:      number;
    percentage:      number;
    negative:        boolean;
    __v:             number;
    profileImageUrl: string;
}

export interface Bookmark extends List{
    bookmarked: boolean ;
}
