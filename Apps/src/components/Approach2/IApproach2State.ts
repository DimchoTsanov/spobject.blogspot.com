
import { IPost, IComment } from "../../common/ICommonObjects"

export interface IApproach2State {
    AllPosts?: IPost[];
    IsLoading: boolean,
    ExceptionMessage?: string;
}
