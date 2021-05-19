import {
    ClockingTimeEntryBillability,
    EntryType,
    LumpsumEntryBillability,
    TimeEntryBillability,
} from "./enums";

// TODO: Interfaces?

export type Customer = {
    id: number;
    name: string;
    number: string | null;
    active: boolean;
    billableDefault: boolean;
    note?: string | null;
    projects?: Array<Project> | null;
};

export type Project = {
    id: number;
    customersId: number;
    name: string;
    number: string | null;
    active: boolean;
    billableDefault: boolean;
    note?: string | null;
    budgetMoney?: number | null;
    budgetIsHours?: boolean;
    budgetIsNotStrict?: boolean;
    completed?: boolean;
    billedMoney?: number | null;
    billedCompletely?: boolean | null;
    revenueFactor?: number | null;
};

export type Service = {
    id: number;
    name: string;
    number: string | null;
    active: boolean;
    note: string | null;
};

export type LumpsumService = {
    id: number;
    name: string;
    price: number;
    unit: string | null;
    active: boolean;
    number: string | null;
    note: string | null;
};

export type User = {
    id: number;
    name: string;
    number: string;
    email: string;
    role: string;
    active: boolean;
    editLock: string;
    timeformat12h: boolean;
    weekstartMonday: boolean;
    language: string;
    currency: string;
    currencySymbol: string;
    timezone: string;
};

type CommonEntry = {
    id: number;
    customersId: number;
    projectsId: number | null;
    usersId: number;
    textsId: number | null;
    text: string | null;
    timeSince: string;
    timeUntil: string | null;
    timeInsert: string;
    timeLastChange: string;
    /** @deprecated */
    customersName?: string;
    /** @deprecated */
    projectsName?: string | null;
    /** @deprecated */
    usersName?: string;
    /** @deprecated */
    revenue?: number;
};

type CommonTimeEntry = CommonEntry & {
    type: EntryType.Time;
    servicesId: number;
    /** @deprecated */
    servicesName?: string;
    timeLastChangeWorkTime: string;
    hourlyRate: number | null;
};

type CommonClockTimeEntry = CommonTimeEntry & {
    timeClockedSince: string | null;
    clocked: true;
    clockedOffline: boolean;
};

export type ClockingTimeEntry = CommonClockTimeEntry & {
    billable: ClockingTimeEntryBillability;
    duration: null;
    offset: 0;
};

export type ClockedTimeEntry = CommonClockTimeEntry & {
    billable: TimeEntryBillability;
    duration: number;
    offset: number;
};

export type ManualTimeEntry = CommonTimeEntry & {
    billable: TimeEntryBillability;
    duration: number;
    offset: number;
    timeClockedSince: null;
    clocked: false;
    clockedOffline: false;
};

export type TimeEntry = ClockingTimeEntry | ClockedTimeEntry | ManualTimeEntry;

export type LumpsumValueEntry = CommonEntry & {
    type: EntryType.LumpsumValue;
    billable: LumpsumEntryBillability;
    servicesId: number;
    /** @deprecated */
    servicesName?: string;
    lumpsum: number;
};

export type LumpsumServiceEntry = CommonEntry & {
    type: EntryType.LumpsumService;
    billable: LumpsumEntryBillability;
    lumpsumsId: number;
    lumpsumsAmount: number;
    /** @deprecated */
    lumpsumsPrice?: number;
    /** @deprecated */
    lumpsumsUnit?: string;
    /** @deprecated */
    lumpsumsName?: string;
};

export type Entry = TimeEntry | LumpsumValueEntry | LumpsumServiceEntry;

export type Task = {
    day: string;
    customersId: number;
    customersName: string;
    projectsId: number | 0;
    projectsName: string | null;
    servicesId: number | null;
    servicesName: string | null;
    lumpsumsId: number | null;
    lumpsumsAmount: number | null;
    lumpsumsName: string | null;
    lumpsumsPrice: number | null;
    lumpsumsUnit: string | null;
    billable: 0 | 1;
    textsId: number | 0;
    text: string | null;
    timeSince: string;
    timeUntil: string;
    duration: number;
    durationTime: string;
    durationText: string;
    isClocking: boolean;
    hasJustLumpsums: boolean;
    revenue?: number;
};

export type EntryGroup = {
    groupeyby: string;
    group: string | number;
    name: string;
    number: string;
    note: string;
    restrictions: Array<string>;
    duration: number;
    revenue?: number;
    budgetUsed?: boolean;
    hasBudgetRevenuesBilled?: boolean;
    hasBudgetRevenuesNotBilled?: boolean;
    hasNonBudgetRevenuesBilled?: boolean;
    hasNonBudgetRevenuesNotBilled?: boolean;
    hourlyRate?: number;
    hourlyRateIsEqualAndHasNoLumpsums?: boolean;
    durationWithoutRounding?: number;
    revenueWithoutRounding?: number;
    roundingSuccess?: boolean;
    subGroups: Array<EntryGroup>;
};

export type UserReport = {
    usersId: number;
    usersName: string;
    sumTarget: number;
    sumHours: number;
    sumReductionUsed: number;
    sumReductionPlanned: number;
    overtimeCarryover: number;
    overtimeReduced: number;
    diff: number;
    holidaysQuota: number;
    holidaysCarry: number;
    holidaysUsed: number;
    specialHolidays: number;
    sickdays: number;
    monthDetails: Array<UserReportMonth>;
};

export type UserReportMonth = {
    nr: number;
    sumTarget: number;
    sumHours: number;
    sumHoursWithoutCompensation: number;
    sumReductionUsed: number;
    sumOvertimeReduced: number;
    diff: number;
    weekDetails: Array<UserReportWeek>;
};

export type UserReportWeek = {
    nr: number;
    sumTarget: number;
    sumHours: number;
    sumReductionUsed: number;
    diff: number;
    dayDetails: Array<UserReportDay>;
};

export type Break = {
    since: string;
    until: string;
    length: number;
};

export type UserReportDay = {
    date: string;
    weekday: number;
    nonbusiness: boolean;
    countSick: number;
    countRegularHolidays: number;
    countSpecialLeaves: number;
    countHolidays: number;
    countOtReductionUsed: number;
    target: number;
    targetRaw: number;
    hours: number;
    hoursWithoutCompensation: number;
    diff: number;
    workStart: string;
    workEnd: string;
    breaks: Array<Break>;
};

export type Absence = {
    id: number;
    usersId: number;
    dateSince: string;
    dateUntil: string;
    status: number;
    type: number;
    note: string;
    countDays: number;
    countHours: number;
    dateEnquired: string;
    dateApproved: string;
    approvedBy: number;
};

export type TargetHoursRow = {
    id: number;
    usersId: number;
    type: string;
    dateSince: string;
    dateUntil: string | null;
    monday: number;
    tuesday: number;
    wednesday: number;
    thursday: number;
    friday: number;
    saturday: number;
    sunday: number;
    absenceFixedCredit: boolean;
    compensationDaily: number;
    compensationMonthly: number;
    monthlyTarget: number;
    workdayMonday: boolean;
    workdayTuesday: boolean;
    workdayWednesday: boolean;
    workdayThursday: boolean;
    workdayFriday: boolean;
    workdaySaturday: boolean;
    workdaySunday: boolean;
};

export type Paging = {
    itemsPerPage: number;
    currentPage: number;
    countPages: number;
    countItems: number;
};

export type Filter = {
    usersId?: number;
    customersId?: number;
    projectsId?: number;
    servicesId?: number;
    billable?: number;
    text?: string;
    textsId?: number;
    budgetType?: string;
};
