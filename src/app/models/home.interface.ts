/* eslint-disable @typescript-eslint/naming-convention */
export interface HomeApi{
    lastUpdated: Date ;
    graph: GraphData[] ;
    index: StockIndex[] ;
}

export interface GraphResult {
    code:    number;
    metrics: GraphMetrics;
}

export interface GraphMetrics {
    data: GraphData[];
}

export interface GraphData {
    _id:  string;
    name: string;
    data: XYLabel[];
    __v:  number;
}

export interface XYLabel {
    _id:   string;
    time:  string;
    value: number;
}

export interface StockIndicesResult {
    code:    number;
    metrics: StockMetrics;
}

export interface StockMetrics {
    lastUpdated: Date;
    data: StockIndex[];
}

export interface StockIndex {
    _id:        string;
    name:       string;
    current:    string;
    percentage: string;
    open:       string;
    high:       string;
    low:        string;
    prevClose:  string;
    difference: string;
    negative:   boolean;
    __v:        number;
    createdAt:  Date;
    updatedAt:  Date;
}


