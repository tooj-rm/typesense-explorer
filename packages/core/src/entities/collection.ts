


export class Collection {
  constructor(
    public name: string,
    public documentCount: number,
    public fields: CollectionField[]
  ) {
  }

  get fieldCount() {
    return this.fields.length;
  }
}

export interface CollectionField {
  name: string;
  type: string;
  facet?: boolean;
  index?: boolean;
  optional?: boolean;
}