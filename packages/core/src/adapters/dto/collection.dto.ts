export type CollectionDto = {
  name: string;
  fields: CollectionFieldDto[];
  num_documents: number;
}

export type CollectionFieldDto = {
  name: string;
  type: string;
  facet?: boolean;
  index?: boolean;
  optional?: boolean;
}