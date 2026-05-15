export class Documents {
  constructor(
    public searchTime: number,
    public total: number,
    public values: Record<string, any>[]
  ) {
  }
}