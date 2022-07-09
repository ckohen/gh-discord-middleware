import type { ReleaseEvent } from '@octokit/webhooks-types';
import { PackageName } from '../constants';
import { getPotentialPackageTarget } from '../functions';
import type { DiscordWebhooksTarget } from '../webhooks';

/**
 * Gets the target for incoming release type webhooks
 * @param event The event data
 * @returns The target name
 */
export function getReleaseRewriteTarget(event: ReleaseEvent): DiscordWebhooksTarget {
	let potentialPackage = event.release.tag_name.split('/')[1]?.split('@')[0];
	if (!potentialPackage && /^\d+\.\d+\.\d+$/gm.test(event.release.tag_name)) potentialPackage = PackageName.DiscordJS;
	if (!potentialPackage) return 'monorepo';
	return getPotentialPackageTarget(potentialPackage);
}
