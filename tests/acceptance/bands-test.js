import { module, test } from 'qunit';
import { visit, click, fillIn, waitFor } from '@ember/test-helpers';
import { setupApplicationTest } from 'rarwe/tests/helpers';
import { setupMirage } from 'ember-cli-mirage/test-support';
import { getPageTitle } from 'ember-page-title/test-support';

module('Acceptance | bands', function (hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  test('Create a band', async function (assert) {
    this.server.create('band', { name: 'Royal Blood' });

    await visit('/');
    await click('a[href="/bands/new"]');
    await fillIn('input', 'Caspian');
    await click('button');
    await waitFor('p.text-center');

    let bandLinks = document.querySelectorAll('.mb-2 > a');
    assert.strictEqual(
      bandLinks.length,
      2,
      'All band links are rendered',
      'A new band link is rendered'
    );
    assert.ok(
      bandLinks[1].textContent.includes('Caspian'),
      'The new band link is rendered as the last item'
    );
    assert.ok(
      document
        .querySelector('.border-b-4.border-purple-400')
        .textContent.includes('Songs'),
      'The Songs tab is active'
    );
  });
});