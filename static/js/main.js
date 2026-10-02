// آرایشگاه مردانه سلطان — اسکریپت مشترک صفحات
document.addEventListener("DOMContentLoaded", function () {

  /* منوی موبایل */
  var toggle = document.querySelector(".nav-toggle");
  var links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      links.classList.toggle("open");
    });
  }

  /* فعال کردن لینک صفحه جاری در منو */
  var current = document.body.getAttribute("data-page");
  if (current) {
    document.querySelectorAll(".nav-links a").forEach(function (a) {
      if (a.getAttribute("data-nav") === current) a.classList.add("active");
    });
  }

  /* فیلتر تب (گالری یا لیست قیمت) */
  var tabs = document.querySelectorAll(".tab-btn");
  var items = document.querySelectorAll("[data-group]");
  if (tabs.length) {
    tabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        tabs.forEach(function (t) { t.classList.remove("active"); });
        tab.classList.add("active");
        var group = tab.getAttribute("data-tab");
        items.forEach(function (item) {
          var show = group === "all" || item.getAttribute("data-group") === group;
          item.style.display = show ? "" : "none";
        });
      });
    });
  }

  /* فرم رزرو نوبت / تماس — اعتبارسنجی ساده سمت کلاینت */
  var form = document.querySelector("#booking-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var ok = true;

      form.querySelectorAll("[required]").forEach(function (input) {
        var field = input.closest(".field");
        if (!field) return;
        if (!input.value || !input.value.trim()) {
          field.classList.add("invalid");
          ok = false;
        } else {
          field.classList.remove("invalid");
        }
      });

      var phoneInput = form.querySelector("#phone");
      if (phoneInput && phoneInput.value && !/^0?9\d{9}$/.test(phoneInput.value.replace(/\s/g, ""))) {
        phoneInput.closest(".field").classList.add("invalid");
        ok = false;
      }

      var successBox = document.querySelector("#form-success");
      if (ok) {
        form.reset();
        if (successBox) successBox.classList.add("show");
        window.scrollTo({ top: form.offsetTop - 100, behavior: "smooth" });
      } else if (successBox) {
        successBox.classList.remove("show");
      }
    });
  }
});
