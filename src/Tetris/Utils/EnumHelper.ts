export class EnumHelper {
    public static ToArray(val: any): typeof val[] {
        return Object.keys(val)
            .map(n => Number.parseInt(n))
            .filter(n => !Number.isNaN(n)) as unknown as typeof val[];
    }

    public static GetRandom(val: any): typeof val {
        const values = EnumHelper.ToArray(val);
        const randomIndex = Math.floor(Math.random() * values.length);
        return values[randomIndex];
    }
}
