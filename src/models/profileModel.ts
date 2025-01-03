import { ProfileTDO } from "src/modules/profile/dto/ProfileDTO";
import { Profile } from "src/modules/profile/entity/profile";

export abstract class ProfileModels<T>{
    abstract getAll(dataProfileDTO:any):Promise<T[]>;
    abstract getOne(id:any):Promise<T>;
    abstract create(bodyProfileDTO:any):Promise<T>;
    abstract removeProfile(id:any):Promise<T>;
    abstract updateProfile(id:any, dataUpdateProfile:any):Promise<T>;
    abstract getAllProfiles(profilesQuery:ProfileTDO):Promise<Profile[]>;
}