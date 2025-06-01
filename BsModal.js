var oBsModal = { oWinList: [], x: 0, y: 0, oDragItem: null };

function ShowModal(sUrl, iWidth, iHeight, oWin) {
	if (oWin + "" == "undefined") oWin = window;
	if (iWidth + "" == "undefined") iWidth = $(window).width() - 100;
	if (iHeight + "" == "undefined") iHeight = $(window).height() - 150;

	oBsModal.oWinList.push(oWin);
	var iIndex = oBsModal.oWinList.length;

	$(document).on('show.bs.modal', '.modal', function (event) {
		var zIndex = 1040 + (10 * $('.modal:visible').length);
		$(this).css('z-index', zIndex);

		setTimeout(function () {
			$('.modal-backdrop').not('.modal-stack').css('z-index', zIndex - 1).addClass('modal-stack');
		}, 0);
	});

	$("#popupContainer" + iIndex).remove();
	$("body").append('<div id="popupContainer' + iIndex + '" class="modal fade" role="dialog">' +
			'<div id="popupDialog' + iIndex + '" class="modal-dialog" style="width: ' + (iWidth + 30) + 'px">' +
				'<div class="modal-content" id="modal-content' + iIndex + '">' +
					'<div id="popupTitleBar' + iIndex + '" class="modal-header" style="cursor: move">' +
						'<button type="button" class="close" data-dismiss="modal">&times;</button>' +
						'<h4 style="pointer-events: none;" id="popupTitle' + iIndex + '" class="modal-title"></h4>' +
					'</div>' +
					'<div class="modal-body">' +
					'<div id="idDiaLoading' + iIndex + '" style="text-align: center;width:100%; height:' + iHeight + 'px; line-height:' + iHeight + 'px;"><i style"vertical-align: middle" class="fa fa-spinner fa-spin fa-5x"></i></div>' +
					'<div id="idDiaOverlay' + iIndex + '" style="background-color: transparent; position: absolute;width: 100%; z-index: 10000; display: none;"></div>' +
					'<iframe id="popupFrame' + iIndex + '" name="popupFrame' + iIndex + '" onload="SetPopupTitleBar(this,' + iIndex + ')" src="' + sUrl + '" ' +
						'style="display:none; margin: 0px; position: relative; z-index: 202; width:100%; height:100%;background-color:transparent;" scrolling="auto" frameborder="0" allowtransparency="true" width="100%" height="100%"></iframe>' +
					'</div>' +
				 '</div>' +
			'</div>' +
		'</div>');

	$("#popupContainer" + iIndex).modal();
	$("#popupFrame" + iIndex).css({ height: iHeight });
	$("#popupContainer" + iIndex).on('hidden.bs.modal', function () {
		if (oBsModal.oWinList.length > 0) oBsModal.oWinList.length--;
	})

	setTimeout(function () {
		DiaMakeDraggable(iIndex);
	}, 500)	
}

function DiaMakeDraggable(id) {
	var o = $("#idDiaOverlay" + id);

	$("#modal-content" + id).resizable({
		alsoResize: "#popupFrame" + id,
		start: function (event, ui) {
			o.height(o.parent().height());
			o.show();
		},
		stop: function (event, ui) {
			o.hide(); ;
		}
	});

	$("#modal-content" + id).draggable({
		start: function (event, ui) {
			o.height(o.parent().height());
			o.show();
		},
		stop: function (event, ui) {
			o.hide(); ;
		}
	});
}

function HideModal() {
	var iIndex = oBsModal.oWinList.length;
	$("#popupContainer" + iIndex).modal("hide");
}

function GetModalWin() {
	return oBsModal.oWinList[oBsModal.oWinList.length - 1];
}

function SetPopupTitleBar(oIframe, iIndex) {
	try {
		$("#popupTitle" + iIndex).html(oIframe.contentWindow.document.title);
	} catch (ex) {
		$("#popupTitle" + iIndex).hide();
	}

	$("#idDiaLoading" + iIndex).hide();
	$("#popupFrame" + iIndex).show();
}
