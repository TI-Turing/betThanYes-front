export interface Routine {
    Id: string; // uniqueidentifier
    RoutineNumber: number; // bigint
    UserId: string; // uniqueidentifier
    RoutineName: string; // nvarchar(100)
    IsDefault: boolean; // bit
    CreatedAt: Date; // datetime
  }
  