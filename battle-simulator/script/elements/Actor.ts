import Status  from './Status';
import { Action } from '../action/module';

export default interface Actor {
    status: Status;
    action: Array<Action>;

    addAction: (action: Action) => void;
    // act: () => {type: string, value: number};
}