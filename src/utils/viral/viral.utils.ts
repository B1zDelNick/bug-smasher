import {InviteWindow} from './invite.window';
import {UnblockWindow} from './unblock.window';
import {PauseWindow} from './pause.window';
import {QuitWindow} from './quit.window';
import {WeaponWindow} from './weapon.window';

export class ViralUtils {
	public static addInviteWindow(): InviteWindow {
		return new InviteWindow();
	}

    public static addUnblockWindow(): UnblockWindow {
        return new UnblockWindow();
    }

    public static addPauseWindow(): PauseWindow {
        return new PauseWindow();
    }

    public static addQuitWindow(): QuitWindow {
        return new QuitWindow();
    }

    public static addWeaponWindow(): WeaponWindow {
        return new WeaponWindow();
    }
}