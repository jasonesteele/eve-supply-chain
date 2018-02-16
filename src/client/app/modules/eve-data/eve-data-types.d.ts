export interface ItemGroup {
  id: number;
  name: string;
  anchorable: boolean;
  anchored: boolean;
  categoryID: number;
  fittableNonSingleton: boolean;
  published: boolean;
  useBasePrice: boolean;
}

export interface ItemType {
  id: number;
  name: string;
  description?: string;
  mass?: number;
  volume?: number;
  capacity?: number;
  published?: boolean;
  portionSize?: number;
  metaType?: ItemMetaType
}

export interface SkillLevel extends ItemType {
  level: number;
}

export interface ItemStack {
  type: ItemType;
  quantity: number;
}

export interface PossibleItemStack extends ItemStack {
  probability?: number;
}

export interface IndustrialActivity {
  materials?: ItemStack[];
  products?: PossibleItemStack[];
  skills?: SkillLevel[]
  time: number;
}

export interface BlueprintActivities {
  copying?: IndustrialActivity;
  researchMaterial?: IndustrialActivity;
  researchTime?: IndustrialActivity;
  manufacturing?: IndustrialActivity;
  invention?: IndustrialActivity;
  reaction?: IndustrialActivity;
}

export interface BlueprintType extends ItemType {
  activities: BlueprintActivities;
  maxProductLimit?: number;
}

export interface ItemMetaGroup {
  id: number;
  name: string;
}

export interface ItemMetaType {
  id: number;
  metaGroup: ItemMetaGroup;
  parentTypeId?: number;
}
