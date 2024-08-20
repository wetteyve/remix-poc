# Caching

## In-Memory Caching

The application leverages the "mem" package to implement in-memory caching for PAC page data, specifically for the following page types: `home`, `topic`, `micropage`, and `show`. By default, the data for these pages is cached for 5 minutes to optimize performance and reduce server load. However, as the content on these pages becomes increasingly personalized, the effectiveness of this caching strategy will diminish. This initial approach serves as a starting point, and the caching duration and strategy will be adapted over time to better align with evolving personalization requirements and ensure optimal performance.

## CDN

Akamai is currently our CDN (Content Delivery Network) partner, offering the best prices and features for our needs. Most of our traffic is routed through Akamai, which also integrates several critical security features such as Web Application Firewall (WAF) and Security Operations Center (SOC). The contract with Akamai was renewed in 2022 for an extended period (exact duration unknown).

For more detailed service descriptions, please refer to the following SWISS TXT document: [Akamai CDN Service Description](https://intranet-swisstxt.srgssr.ch/Workspaces/WS_000010/Shared%20Documents/service_description_AkamaiCDN.pdf).

Given the significant investment by SRG into Akamai and the absence of any major criticisms of the service, it is recommended to continue using Akamai as the primary CDN. Akamai not only provides content delivery but also offers various security features, making it a comprehensive solution.

### Alternative CDNs

While Akamai is the primary CDN, teams are allowed to use other CDN providers if necessary. For example, the EAI team uses CloudFront for delivering a limited number of files due to its ease of integration and cost-effectiveness for smaller traffic volumes.

#### Considerations for Alternative CDNs

- **Cost vs. Benefit**: Alternative CDNs may require careful evaluation of costs and benefits. Akamai's costs are largely covered by the existing contract, whereas alternative CDNs operate on a pay-per-use model, and costs would need to be borne by the respective product/team.
- **Security**: Remember that Akamai offers integrated security features (WAF, DoS protections, etc.) which may not be available or as robust in alternative solutions.

### Conclusion

Akamai remains a strong choice for CDN services due to its pricing, features, and security integration. However, teams can opt for alternative CDNs when specific requirements or simpler integration justify the choice, keeping in mind the cost implications.
