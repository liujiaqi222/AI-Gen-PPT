export type ApiResponse<T = JsonValue> = {
  data: T;
  message: string;
};

export type Project = {
  id: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  slides: JsonValue;
  userId: string;
  outlines?: JsonValue;
  isDeleted: boolean;
  isSellable: boolean;
  variantId?: string;
  thumbnail?: string;
  themeName?: string;
};

export type JsonObject = {
  [key: string]: JsonValue;
};

export type JsonArray = JsonValue[];
export type JsonValue = string | null | number | boolean | JsonObject | JsonArray;
