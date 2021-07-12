/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-empty-interface */

import { News } from './news.interface';
import { Twitter } from './twitter.interface';

export interface CompanyFullDetails {
    code:    number;
    details: Details;
}

export interface Details {
    assetProfile:           AssetProfile;
    summaryDetail:          SummaryDetail;
    balanceSheetHistory:    BalanceSheetHistory;
    incomeStatementHistory: DetailsIncomeStatementHistory;
    stock:                  Stock;
}

export interface AssetProfile {
    address1:                  string;
    address2:                  string;
    city:                      string;
    zip:                       string;
    country:                   string;
    phone:                     string;
    website:                   string;
    industry:                  string;
    sector:                    string;
    longBusinessSummary:       string;
    fullTimeEmployees:         number;
    companyOfficers:           CompanyOfficer[];
    auditRisk:                 number;
    boardRisk:                 number;
    compensationRisk:          number;
    shareHolderRightsRisk:     number;
    overallRisk:               number;
    governanceEpochDate:       number;
    compensationAsOfEpochDate: number;
    maxAge:                    number;
    fax:                       string;
}

export interface CompanyOfficer {
    maxAge:           number;
    name:             string;
    age?:             number;
    title:            string;
    yearBorn?:        number;
    fiscalYear?:      number;
    totalPay?:        AskSize;
    exercisedValue:   AskSize;
    unexercisedValue: AskSize;
}

export interface AskSize {
    raw:     number;
    fmt:     null | string;
    longFmt: string;
}

export interface BalanceSheetHistory {
    balanceSheetStatements: BalanceSheetStatement[];
    maxAge:                 number;
}

export interface BalanceSheetStatement {
    maxAge:                       number;
    endDate:                      Ask;
    cash:                         AskSize;
    shortTermInvestments:         AskSize;
    netReceivables:               AskSize;
    inventory:                    AskSize;
    otherCurrentAssets:           AskSize;
    totalCurrentAssets:           AskSize;
    longTermInvestments:          AskSize;
    propertyPlantEquipment:       AskSize;
    goodWill:                     AskSize;
    intangibleAssets:             AskSize;
    otherAssets:                  AskSize;
    deferredLongTermAssetCharges: AskSize;
    totalAssets:                  AskSize;
    accountsPayable:              AskSize;
    otherCurrentLiab:             AskSize;
    otherLiab:                    AskSize;
    deferredLongTermLiab:         AskSize;
    minorityInterest:             AskSize;
    totalCurrentLiabilities:      AskSize;
    totalLiab:                    AskSize;
    commonStock:                  AskSize;
    retainedEarnings:             AskSize;
    treasuryStock:                AskSize;
    otherStockholderEquity:       AskSize;
    totalStockholderEquity:       AskSize;
    netTangibleAssets:            AskSize;
}

export interface Ask {
    raw: number;
    fmt: string;
}

export interface DetailsIncomeStatementHistory {
    incomeStatementHistory: IncomeStatementHistoryElement[];
    maxAge:                 number;
}

export interface IncomeStatementHistoryElement {
    maxAge:                            number;
    endDate:                           Ask;
    totalRevenue:                      AskSize;
    costOfRevenue:                     AskSize;
    grossProfit:                       AskSize;
    researchDevelopment:               CirculatingSupply;
    sellingGeneralAdministrative:      AskSize;
    nonRecurring:                      CirculatingSupply;
    otherOperatingExpenses:            AskSize;
    totalOperatingExpenses:            AskSize;
    operatingIncome:                   AskSize;
    totalOtherIncomeExpenseNet:        AskSize;
    ebit:                              AskSize;
    interestExpense:                   AskSize;
    incomeBeforeTax:                   AskSize;
    incomeTaxExpense:                  AskSize;
    minorityInterest:                  AskSize;
    netIncomeFromContinuingOps:        AskSize;
    discontinuedOperations:            CirculatingSupply;
    extraordinaryItems:                CirculatingSupply;
    effectOfAccountingCharges:         CirculatingSupply;
    otherItems:                        CirculatingSupply;
    netIncome:                         AskSize;
    netIncomeApplicableToCommonShares: AskSize;
}

export interface CirculatingSupply {
}

export interface Stock {
    _id:        string;
    name:       string;
    symbol:     string;
    YFSymbol:   string;
    price:      number;
    prevClose:  number;
    difference: number;
    percentage: number;
    negative:   boolean;
    __v:        number;
}

export interface SummaryDetail {
    maxAge:                       number;
    priceHint:                    AskSize;
    previousClose:                Ask;
    open:                         Ask;
    dayLow:                       Ask;
    dayHigh:                      Ask;
    regularMarketPreviousClose:   Ask;
    regularMarketOpen:            Ask;
    regularMarketDayLow:          Ask;
    regularMarketDayHigh:         Ask;
    dividendRate:                 Ask;
    dividendYield:                Ask;
    exDividendDate:               Ask;
    payoutRatio:                  Ask;
    fiveYearAvgDividendYield:     Ask;
    beta:                         Ask;
    trailingPE:                   Ask;
    forwardPE:                    Ask;
    volume:                       AskSize;
    regularMarketVolume:          AskSize;
    averageVolume:                AskSize;
    averageVolume10days:          AskSize;
    averageDailyVolume10Day:      AskSize;
    bid:                          Ask;
    ask:                          Ask;
    bidSize:                      AskSize;
    askSize:                      AskSize;
    marketCap:                    AskSize;
    yield:                        CirculatingSupply;
    ytdReturn:                    CirculatingSupply;
    totalAssets:                  CirculatingSupply;
    expireDate:                   CirculatingSupply;
    strikePrice:                  CirculatingSupply;
    openInterest:                 CirculatingSupply;
    fiftyTwoWeekLow:              Ask;
    fiftyTwoWeekHigh:             Ask;
    priceToSalesTrailing12Months: Ask;
    fiftyDayAverage:              Ask;
    twoHundredDayAverage:         Ask;
    trailingAnnualDividendRate:   Ask;
    trailingAnnualDividendYield:  Ask;
    navPrice:                     CirculatingSupply;
    currency:                     string;
    fromCurrency:                 null;
    toCurrency:                   null;
    lastMarket:                   null;
    volume24Hr:                   CirculatingSupply;
    volumeAllCurrencies:          CirculatingSupply;
    circulatingSupply:            CirculatingSupply;
    algorithm:                    null;
    maxSupply:                    CirculatingSupply;
    startDate:                    CirculatingSupply;
    tradeable:                    boolean;
}

export interface ChartDetails {
    code:  number;
    chart: Chart;
}

export interface Chart {
    range:      '1d' | '5d' | '6mo' | '1yr' | '5yr';
    timestamp:  number[] | [];
    indicators: number[] | [];
}

export interface ChartFullDetails{
    '1d': Chart ;
    '5d': Chart ;
    '6mo': Chart ;
    '1yr': Chart ;
    '5yr': Chart ;
}

export interface LoadInterFace{
    details: Details ;
    chart: ChartFullDetails ;
    news: News[] ;
    twitter: Twitter[] | null;
}
