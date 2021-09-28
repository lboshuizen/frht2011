
interface Location {
    Description: "industrial area" | "rural area"
}

interface Address {
    Location?: Location;
}

interface Party {
    Firstname: string;
    ClaimIntoxication: boolean;
    Address: Address;
}

interface Reference {
    Reference: string;
}

interface Object {
    Vin: string;
    ListPrice: number;
}

interface ObjectsInsured{
    Object: Object;
}

interface Policy {
    RegularDrivers: Reference[];
    ObjectsInsured: ObjectsInsured[]
}

interface Claim {
    Policy: Policy;
    Address: Address;
    TimeOccurred: Date;
    PoliceInvolved: boolean;
}

export interface ClaimContainer {
    Parties : Record<string,Party>;
    Claim: Claim;
}