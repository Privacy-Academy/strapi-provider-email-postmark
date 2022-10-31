# @joshmeads/strapi-provider-email-postmark

Based upon [@strapi/provider-email-sendgrid](https://github.com/strapi/strapi/tree/v4.4.5/packages/providers/email-sendgrid)

## Resources

- [LICENSE](LICENSE)

## Links

- [PostmarkApp](https://postmarkapp.com/)
- [Strapi website](https://strapi.io/)
- [Strapi documentation](https://docs.strapi.io)
- [Strapi community on Discord](https://discord.strapi.io)
- [Strapi news on Twitter](https://twitter.com/strapijs)

## Installation

```bash
# using yarn
yarn add @joshmeads/strapi-provider-email-postmark

# using npm
npm install @joshmeads/strapi-provider-email-postmark --save
```

## Configuration

| Variable                           | Type    | Description                                                                                                                     | Required | Default   |
| ---------------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------- | -------- | --------- |
| provider                           | string  | The name of the provider you use                                                                                                | yes      |           |
| providerOptions                    | object  | Will be directly given to `require('postmark')`. Please refer to [postmark](https://www.npmjs.com/package/postmark) doc.        | yes      | {}        |
| providerOptions.serverToken        | string  | Your Postmark server token / api key                                                                                            | yes      | {}        |
| settings                           | object  | Settings                                                                                                                        | no       | {}        |
| settings.defaultFrom               | string  | Default sender mail address                                                                                                     | no       | undefined |
| settings.defaultSubject            | string  | Default subject line                                                                                                            | no       | undefined |
| settings.defaultTo                 | string  | Default recipient mail address                                                                                                  | no       | undefined |
| settings.defaultReplyTo            | string  | Default reply mail address                                                                                                      | no       | undefined |
| settings.defaultTag                | string  | Default applied tag in Postmark Dashboard                                                                                       | no       | undefined |
| settings.defaultTrackOpens         | boolean | Track opens by Default                                                                                                          | no       | undefined |
| settings.defaultTrackLinks         | string  | Track links by Default [Valid ENUM Options](https://activecampaign.github.io/postmark.js/enums/Models.LinkTrackingOptions.html) | no       | undefined |
| settings.defaultMessageStream      | string  | Default message stream to use                                                                                                   | no       | undefined |
| settings.defaultTemplateModelItems | object  | If using a template these items will exist on the model unless overwritten.                                                     | no       | undefined |

> :warning: The Shipper Email (or defaultfrom) may also need to be changed in the `Email Templates` tab on the admin panel for emails to send properly

### Example

**Path -** `config/plugins.js`

```js
module.exports = ({ env }) => ({
  // ...
  email: {
    config: {
      provider: "@joshmeads/strapi-provider-email-postmark",
      providerOptions: {
        serverToken: env("POSTMARK_SERVER_TOKEN"),
      },
      settings: {
        defaultFrom: env("POSTMARK_DEFAULT_FROM", "myemail@protonmail.com"),
        defaultTo: env("POSTMARK_DEFAULT_TO", "myemail@protonmail.com"),
        defaultReplyTo: env("POSTMARK_DEFAULT_REPLY_TO"),
        defaultSubject: env("POSTMARK_DEFAULT_SUBJECT"),
        defaultTag: env("POSTMARK_DEFAULT_TAG"),
        defaultTrackOpens: env.bool("POSTMARK_DEFAULT_TRACK_OPENS"),
        defaultTrackLinks: env("POSTMARK_DEFAULT_TRACK_LINKS"),
        defaultMessageStream: env("POSTMARK_DEFAULT_MESSAGE_STREAM"),
        defaultTemplateModelItems: env.json(
          "POSTMARK_DEFAULT_TEMPLATE_MODEL_ITEMS"
        ),
      },
    },
  },
  // ...
});
```
