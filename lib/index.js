"use strict";

const merge = require("lodash").merge;
const postmark = require("postmark");
const { removeUndefined } = require("@strapi/utils");

module.exports = {
  init(providerOptions = {}, settings = {}) {
    const { serverToken, ...postmarkOptions } = providerOptions;
    const client = new postmark.ServerClient(serverToken, postmarkOptions);

    return {
      async send(options) {
        const {
          from,
          to,
          cc,
          bcc,
          replyTo,
          subject,
          text,
          html,
          tag,
          trackOpens,
          trackLinks,
          headers,
          attachments,
          metadata,
          messageStream,
          inlineCss,
          templateId,
          templateAlias,
          templateModel,
          ...rest
        } = options;

        const messageDefaults = {
          From: settings.defaultFrom,
          Subject: settings.defaultSubject,
          MessageStream: settings.defaultMessageStream,
          To: settings.defaultTo,
          ReplyTo: settings.defaultReplyTo,
          Tag: settings.defaultTag,
          TrackOpens: settings.defaultTrackOpens,
          TrackLinks: settings.defaultTrackLinks,
        };

        const message = {
          From: from,
          Subject: subject,
          HtmlBody: html,
          TextBody: text,
          MessageStream: messageStream,
          To: to,
          Cc: cc,
          Bcc: bcc,
          ReplyTo: replyTo,
          Tag: tag,
          TrackOpens: trackOpens,
          TrackLinks: trackLinks,
          Headers: headers,
          Attachments: attachments,
          Metadata: metadata,
        };

        // Create templated email if params are valid
        if (
          (templateId || templateAlias) &&
          templateModel &&
          Object.keys(templateModel).length > 0
        ) {
          return client.sendEmailWithTemplate(
            removeUndefined({
              ...merge(messageDefaults, {
                ...message,
                TemplateId: templateId,
                TemplateAlias: templateAlias,
                InlineCss: inlineCss,
                TemplateModel: {
                  ...(settings.defaultTemplateModelItems || {}),
                  ...templateModel,
                },
              }),
              ...rest,
            })
          );
        }

        return client.sendEmail(
          removeUndefined({ ...merge(messageDefaults, message), ...rest })
        );
      },
    };
  },
};
