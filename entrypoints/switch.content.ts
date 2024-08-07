import { configStorage } from "~utils/config";
import { GOOGLE_MEET_MATCH, GOOGLE_MEET_SELECTOR } from "~utils/constants";
import { toggleClass, waitFor } from "~utils/dom";
import { setGlobalValue } from "~utils/globals";

const CLASS_NAME = {
	ACTIVE: "eBlXUe-scr2fc-OWXEXe-gk6SMd",
	INACTIVE: "eBlXUe-scr2fc-OWXEXe-uqeOfd",
};

export default defineContentScript({
	runAt: "document_idle",
	matches: [GOOGLE_MEET_MATCH],
	async main() {
		const { enableByDefault } = await configStorage.getValue();

		setGlobalValue("enabled", enableByDefault);

		const parser = new DOMParser();
		const wrapper = await waitFor(GOOGLE_MEET_SELECTOR.COMMENT_SWITCHES);

		const { documentElement } = parser.parseFromString(
			`
<div class="BReBS IZY82c">
  <div aria-hidden="true" class="o6rdsc pFy0uf">コメントをオーバーレイ</div>
  <div class="eBlXUe-H9tDt  OAFLMe udb6Ob-ibL1re">
    <button type="button" role="switch" class="eBlXUe-scr2fc ${enableByDefault ? CLASS_NAME.ACTIVE : CLASS_NAME.INACTIVE}" aria-checked="false" aria-label="コメントをオーバーレイ">
      <div class="eBlXUe-l6JLsf">
        <div class="eBlXUe-uMhiad-haAclf">
          <span class="RBHQF-ksKsZd eBlXUe-Qsb3yd" data-unbounded="true" jscontroller="LBaJxb" jsname="m9ZlFb"></span>
          <div class="eBlXUe-uMhiad eBlXUe-uMhiad-OWXEXe-zfdrlf">
            <div class="eBlXUe-lw9akd"><div class="eBlXUe-pafCAf-OWXEXe-IT5dJd">
              <span class="eBlXUe-pafCAf" aria-hidden="true">
                <svg viewBox="0 0 24 24"><path d="M9.55 18.2 3.65 12.3 5.275 10.675 9.55 14.95 18.725 5.775 20.35 7.4Z"></path></svg>
              </span>
            </div>
            <div class="eBlXUe-pafCAf-OWXEXe-Xhs9z">
              <span class="eBlXUe-pafCAf" aria-hidden="true">
                <svg viewBox="0 0 24 24"><path d="M6.4 19.2 4.8 17.6 10.4 12 4.8 6.4 6.4 4.8 12 10.4 17.6 4.8 19.2 6.4 13.6 12 19.2 17.6 17.6 19.2 12 13.6Z"></path></svg>
              </span>
            </div>
          </div>
        </div>
      </div>
      <span class="eBlXUe-hywKDc"></span>
      <span class="OiePBf-zPjgPe"></span>
    </div>
    </button>
  </div>
</div>
      `,
			"text/html",
		);

		const button = documentElement.querySelector("button");

		button?.addEventListener("click", (e) => {
			e.preventDefault();

			if (e.currentTarget instanceof HTMLButtonElement) {
				const className = toggleClass(
					e.currentTarget,
					CLASS_NAME.ACTIVE,
					CLASS_NAME.INACTIVE,
				);

				setGlobalValue("enabled", className === CLASS_NAME.ACTIVE);
			}
		});

		wrapper.appendChild(documentElement);
	},
});
