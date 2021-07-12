import * as core from '@actions/core';
import { LokalisePushClient } from '@src/lokalise/push/client';

enum ACTION {
  PUSH = 'push',
  PULL = 'pull',
}

async function run(): Promise<void> {
  const args = {
    apiKey: core.getInput('api-token'),
    projectId: core.getInput('project-id'),
    format: core.getInput('format'),
    translationDirectory: core.getInput('translation-directory'),
    replaceModified: core.getBooleanInput('replace-modified'),
  };

  switch (core.getInput('action')) {
    case ACTION.PUSH: {
      const pushClient = new LokalisePushClient(args);
      await pushClient.push();
      break;
    }
    default: {
      core.error('Invalid action');
      break;
    }
  }
}

run();
