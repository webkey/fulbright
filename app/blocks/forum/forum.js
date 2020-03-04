app.forum = {
	messageFieldElement: '.js-message-field',
	replayContainerElement: '.js-reply-container',
	replayMessageElement: '.js-reply-msg',
	replayMessageControlElement: '.js-reply-msg-control',
	collapseOther: true,
	init() {
		app.common.initScript('autosize.min', 'autosize', () => {
			if ($(this.messageFieldElement).length) {
				this.autosizeTextarea();
			}
			if ($(this.replayMessageControlElement).length) {
				this.toggleReplyMsg();
			}
		});
	},
	autosizeTextarea(field) {
		const $field = $(field || this.messageFieldElement);
		autosize($field);
	},
	toggleReplyMsg(control, msg) {
		const self = this;
		const $container = $(this.replayContainerElement);
		const btn = control || this.replayMessageControlElement;
		const $msg = $(msg || this.replayMessageElement);
		const dur = 300;

		$('body').on('click', btn, function (e) {
			const $curBtn = $(this);
			const $curMsg = $curBtn.closest($container).find($msg);

			if ($curMsg.is(':animated')) {
				return false;
			}

			if ($curBtn.prop('active')) {
				$curBtn.prop('active', false);
				$curMsg.stop().slideUp(dur);
			} else {
				if (self.collapseOther) {
					$(btn).prop('active', false);
					$msg.stop().slideUp(dur);
				}

				$curBtn.prop('active', true);
				$curMsg.stop().slideDown(dur, function () {
					$curMsg.find('textarea').focus();
				});
			}

			e.preventDefault();
		});
	}
};
