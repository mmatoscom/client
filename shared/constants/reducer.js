// @flow
import type {ConfigState} from '../reducers/config'
import type {State as DevicesState} from '../reducers/devices'
import type {FavoriteState} from '../constants/favorite'
import type {LoginState} from '../reducers/login'
import type {RootPinentryState} from '../reducers/pinentry'
import type {SignupState} from '../reducers/signup'
import type {State as GregorState} from '../reducers/gregor'
import type {State as PgpState} from '../reducers/pgp'
import type {State as ProfileState} from '../constants/profile'
import type {State as SettingsState} from '../constants/settings'
import type {State as SearchState} from '../reducers/search'
import type {State as TotalTrackerState} from '../reducers/tracker'
import type {State as UnlockFoldersState} from '../reducers/unlock-folders'

export type TypedState = {
  config: ConfigState,
  devices: DevicesState,
  favorite: FavoriteState,
  gregor: GregorState,
  login: LoginState,
  pgp: PgpState,
  pinentry: RootPinentryState,
  profile: ProfileState,
  search: SearchState,
  settings: SettingsState,
  signup: SignupState,
  tracker: TotalTrackerState,
  unlockFolders: UnlockFoldersState,
}

// TODO swap State with TypedState when TypedState includes everything we care about
export type State = {[key: string]: any}
export const stateKey = 'reducer:stateKey'
