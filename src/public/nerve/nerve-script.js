function select(el) {
  return document.getElementById(el);
}
const nerveLinkInput = select('nerve-link-input');

const nerveId = window.location.pathname.split('/');
const nerveLink = `https://nrvl.ink/${nerveId[nerveId.length - 1]}`;

nerveLinkInput.value = nerveLink;

const copyBtn = select('copy-btn');
const shareWtsp = select('share-wtsp');
const shareEmail = select('share-email');
const shareFacebook = select('share-facebook');
const shareLinkedin = select('share-linkedin');
const sharetwitter = select('share-twitter');
const sharePinterest = select('share-pinterest');

shareWtsp.setAttribute(
  'href',
  `https://api.whatsapp.com/send/?text=Check out this Nerve: ${nerveLink}`,
);
shareEmail.setAttribute(
  'href',
  `mailto:?subject=Check out this Nerve! &body=Check out this Nerve: ${nerveLink}`,
);
shareFacebook.setAttribute(
  'href',
  `https://www.facebook.com/sharer.php?u=https:${nerveLink}`,
);
shareLinkedin.setAttribute(
  'href',
  `https://www.linkedin.com/sharing/share-offsite/?url=${nerveLink}`,
);
sharetwitter.setAttribute(
  'href',
  `https://x.com/intent/tweet?text=Check out this Nerve: ${nerveLink}`,
);
sharePinterest.setAttribute(
  'href',
  `https://pinterest.com/pin/create/button/?url=${nerveLink}`,
);

copyBtn.onclick = () => {
  navigator.clipboard.writeText(nerveLinkInput.value).then(() => {
    nerveLinkInput.value = 'Nerve Link Copied!';
    setTimeout(() => {
      nerveLinkInput.value = nerveLink;
    }, 1500);
  });
};
