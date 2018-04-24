/**
 * @license
 * Copyright (c) 2014, 2018, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
"use strict";define(["ojs/ojcore","jquery","promise","ojs/ojcomponentcore"],function(e,t){e.PullToRefreshUtils={},e.PullToRefreshUtils.setupPullToRefresh=function(l,a,s){var o,n,r,i,u,d,h,c,f,p,T,g,v,R;e.PullToRefreshUtils.tearDownPullToRefresh(l),o=t(document.createElement("div")).addClass("oj-pulltorefresh-outer"),e.PullToRefreshUtils._renderAccessibleLink(l,o,a,s),n=t(document.createElement("div")).addClass("oj-pulltorefresh-panel"),o.append(n),(r=t(l)).prepend(o),r.on("touchstart.pulltorefresh",function(l){null==t.data(n[0],"data-pullstart")&&0===r[0].scrollTop&&(e.PullToRefreshUtils._handlePull(l,n,s),(f=n.find(".oj-pulltorefresh-icon")).length>0&&(p=f.parent().outerHeight(!0)),s&&!isNaN(s.threshold)&&(u=parseInt(s.threshold,10)),u=isNaN(u)?n.outerHeight(!0):Math.max(0,Math.min(u,n.outerHeight(!0))),n.css("height",0),n.removeClass("oj-pulltorefresh-transition"),t.data(n[0],"data-pullstart",l.originalEvent.touches[0].clientY),t.data(n[0],"data-pullstart-horiz",l.originalEvent.touches[0].clientX),i=!0)}).on("touchmove.pulltorefresh",function(l){if(null!=(d=t.data(n[0],"data-pullstart"))&&!((h=l.originalEvent.touches[0].clientY-parseInt(d,10))<0)&&(l.preventDefault(),null==t.data(n[0],"data-closing")))if(null==t.data(n[0],"data-loading")){if(i){if(c=l.originalEvent.touches[0].clientX-parseInt(t.data(n[0],"data-pullstart-horiz"),10),Math.abs(c)>h)return;i=!1}n.css("height",h),e.PullToRefreshUtils._fireEvent(l,"pull",n,h),null!=f&&f.length>0&&(null!=(T=t.data(n[0],"data-lasticonclass"))&&f.removeClass(T),(v=10*Math.round(h/u*10))>=100?(R="oj-pulltorefresh-icon-full",g=e.Translations.getTranslatedString("oj-pullToRefresh.titleIconFull")):(R="oj-pulltorefresh-icon-"+v+"-percent",g=e.Translations.getTranslatedString("oj-pullToRefresh.titleIcon"+v+"percent")),f.addClass(R),f.attr("title",g),t.data(n[0],"data-lasticonclass",R),e.PullToRefreshUtils._showHideDefaultText(n,h>p))}else n.css("height",Math.max(h,u))}).on("touchcancel.pulltorefresh",function(t){e.PullToRefreshUtils._cleanup(n)}).on("touchend.pulltorefresh",function(s){if(null!=(d=t.data(n[0],"data-pullstart"))&&null==t.data(n[0],"data-closing"))return null!=t.data(n[0],"data-loading")?(h=t.data(n[0],"data-panelheight"),void n.css("height",h)):void(n.outerHeight()<u?(n.addClass("oj-pulltorefresh-transition").css("height",0),e.PullToRefreshUtils._cleanup(n)):e.PullToRefreshUtils._handleRelease(s,l,n,a))})},e.PullToRefreshUtils._handlePull=function(l,a,s){var o,n;e.PullToRefreshUtils._fireEvent(l,"pull",a,0),0==a.children().length&&(s&&(o=s.primaryText,n=s.secondaryText),e.PullToRefreshUtils._createDefaultContent(a,o,n)),a.prev().text(e.Translations.getTranslatedString("oj-pullToRefresh.ariaRefreshingLink")),a.css("height","auto"),t.data(a[0],"data-panelheight",a.outerHeight())},e.PullToRefreshUtils._handleRelease=function(l,a,s,o){var n,r,i,u,d;n=t.data(s[0],"data-panelheight"),s.addClass("oj-pulltorefresh-transition").css("height",n),e.PullToRefreshUtils._fireEvent(l,"release",s,n),t.data(s[0],"data-loading",!0),(r=s.find(".oj-pulltorefresh-icon")).length>0&&(null!=(i=t.data(s[0],"data-lasticonclass"))&&r.removeClass(i),r.addClass("oj-pulltorefresh-icon-full")),u=e.Context.getContext(a).getBusyContext().addBusyState({description:"PullToRefresh:handleRelease"}),t.data(t(a)[0],"data-pulltorefresh-busystate",u),o().then(function(o){d=function(){e.PullToRefreshUtils._fireEvent(l,"complete",s,n),e.PullToRefreshUtils._cleanup(s),s.off("transitionend",d),s.prev().text(""),e.PullToRefreshUtils._resolveBusyState(a)},s.prev().text(e.Translations.getTranslatedString("oj-pullToRefresh.ariaRefreshCompleteLink")),s.prev().prev().css("position",""),t.data(s[0],"data-closing",!0),s.on("transitionend",d),s.css("height",0)},function(l){d=function(){e.PullToRefreshUtils._cleanup(s),s.off("transitionend",d),s.prev().text(""),e.PullToRefreshUtils._resolveBusyState(a)},s.prev().prev().css("position",""),t.data(s[0],"data-closing",!0),s.on("transitionend",d),s.css("height",0)})},e.PullToRefreshUtils.tearDownPullToRefresh=function(l){t(l).children(".oj-pulltorefresh-outer").remove(),t(l).off(".pulltorefresh"),e.PullToRefreshUtils._resolveBusyState(l)},e.PullToRefreshUtils._resolveBusyState=function(e){var l,a;l=t(e)[0],(a=t.data(l,"data-pulltorefresh-busystate"))&&(a(null),t.removeData(l,"data-pulltorefresh-busystate"))},e.PullToRefreshUtils._fireEvent=function(e,l,a,s){var o=t.Event("oj"+l);o.originalEvent=e,a.trigger(o,{content:a,distance:s})},e.PullToRefreshUtils._createDefaultContent=function(e,l,a){var s,o,n,r;e.addClass("oj-pulltorefresh-content").attr("aria-hidden","true"),(s=t(document.createElement("div"))).addClass("oj-icon oj-pulltorefresh-icon oj-pulltorefresh-icon-initial"),(o=t(document.createElement("div"))).addClass("oj-pulltorefresh-icon-container"),o.append(s),t.data(e[0],"data-lasticonclass","oj-pulltorefresh-icon-initial"),e.append(o),null!=l&&(n=t(document.createElement("div")).addClass("oj-pulltorefresh-primary-text").text(l),e.append(n),null!=a&&(r=t(document.createElement("div")).addClass("oj-pulltorefresh-secondary-text").text(a),e.append(r)))},e.PullToRefreshUtils._showHideDefaultText=function(e,t){var l,a;l=e.find(".oj-pulltorefresh-primary-text"),a=e.find(".oj-pulltorefresh-secondary-text"),t?(l&&l.show(),a&&a.show()):(l&&l.hide(),a&&a.hide())},e.PullToRefreshUtils._renderAccessibleLink=function(l,a,s,o){var n,r,i;(n=t(document.createElement("a"))).text(e.Translations.getTranslatedString("oj-pullToRefresh.ariaRefreshLink")),n.addClass("oj-helper-hidden-accessible").attr("href","#").focus(function(){n.css("position","static")}).blur(function(e){null!=e.relatedTarget&&n.css("position","")}).click(function(t){r=a.children().last(),e.PullToRefreshUtils._handlePull(t,r,o),e.PullToRefreshUtils._handleRelease(t,l,r,s),s()}),(i=t(document.createElement("div"))).addClass("oj-helper-hidden-accessible").attr("aria-live","polite"),a.append(n),a.append(i)},e.PullToRefreshUtils._cleanup=function(e){t.removeData(e[0],"data-pullstart"),t.removeData(e[0],"data-pullstart-horiz"),t.removeData(e[0],"data-loading"),t.removeData(e[0],"data-closing"),e.find(".oj-pulltorefresh-icon").length>0&&e.empty()}});