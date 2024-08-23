import { generateSitemap } from '@nasa-gcn/remix-seo'
import { type ServerBuild, type LoaderFunctionArgs } from '@remix-run/node'
import { getDomainUrl } from '../../utils/misc'

export async function loader({ request, context }: LoaderFunctionArgs) {
	const serverBuild = (await context.serverBuild) as ServerBuild
	const url = getDomainUrl(request)

	return generateSitemap(request, serverBuild.routes, {
		siteUrl: url,
		headers: {
			'Cache-Control': `public, max-age=${60 * 5}`,
		},
	})
}