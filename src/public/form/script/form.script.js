const getAllFormElements = (element) =>
  Array.from(element.elements).filter((tag) =>
    ['select', 'textarea', 'input'].includes(tag.tagName.toLowerCase()),
  );

document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('#atira-form');
  const formId = form.dataset.form;
  const formOwnerId = form.dataset.owner;
  const baseURL = form.dataset.url;

  const formElements = getAllFormElements(form);

  document
    .getElementById('form-button')
    .addEventListener('click', function (e) {
      e.preventDefault();

      const dto = { formId, ownerId: formOwnerId };

      formElements.map((el) => {
        dto[el.name] = el.value;
      });

      fetch(`${baseURL}/api/form/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dto),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error();
          }
          return response;
        })
        .then((data) => {
          document.querySelector('#atira-form-modal-response').textContent =
            'Form was submitted successfully!';
          document.querySelector('#atira-form-modal-response').style.color =
            'black';
        })
        .catch((e) => {
          console.log('ATIRA-SPACE Form Error', e);
          document.querySelector('#atira-form-modal-response').textContent =
            'There was an error submitting the form. Please try again.';
          document.querySelector('#atira-form-modal-response').style.color =
            'red';
        })
        .finally(() => {
          const modal = document.querySelector('#atira-modal-overaly');
          modal.style.display = 'block';
          document
            .querySelector('#atira-form-body')
            .addEventListener('click', function (event) {
              if (event.target == modal) {
                modal.style.display = 'none';
              }
            });
        });
    });
});
