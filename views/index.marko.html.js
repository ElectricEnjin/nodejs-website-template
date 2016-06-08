function create(__helpers) {
  var str = __helpers.s,
      empty = __helpers.e,
      notEmpty = __helpers.ne,
      __loadTemplate = __helpers.l,
      ___layouts_single_column_layout_marko_html = __loadTemplate(require.resolve("../layouts/single-column-layout.marko.html"), require),
      __renderer = __helpers.r,
      ___node_modules_marko_layout_use_tag_js = __renderer(require("marko-layout/use-tag")),
      __tag = __helpers.t,
      ___node_modules_marko_layout_put_tag_js = __renderer(require("marko-layout/put-tag")),
      ___components_app_jumbotron_template_marko = __helpers.l(require.resolve("../components/app-jumbotron/template.marko")),
      ___components_app_thumbnail_template_marko = __helpers.l(require.resolve("../components/app-thumbnail/template.marko")),
      ___components_app_form_template_marko = __helpers.l(require.resolve("../components/app-form/template.marko"));

  return function render(data, out) {
    __tag(out,
      ___node_modules_marko_layout_use_tag_js,
      {
        "template": ___layouts_single_column_layout_marko_html,
        "getContent": function(__layoutHelper) {
          __tag(out,
            ___node_modules_marko_layout_put_tag_js,
            {
              "into": "title",
              "layout": __layoutHelper
            },
            function(out) {
              out.w('My Page Test');
            });
          __tag(out,
            ___node_modules_marko_layout_put_tag_js,
            {
              "into": "description",
              "layout": __layoutHelper
            },
            function(out) {
              out.w('My Page Test Description');
            });
          __tag(out,
            ___node_modules_marko_layout_put_tag_js,
            {
              "into": "content",
              "layout": __layoutHelper
            },
            function(out) {
              ___components_app_jumbotron_template_marko.render({}, out);

              out.w('<div class="container"><div class="col-lg-4">');

              ___components_app_thumbnail_template_marko.render({"label": "Thumbnail 1"}, out);

              out.w('</div><div class="col-lg-4">');

              ___components_app_thumbnail_template_marko.render({"label": "Thumbnail 2"}, out);

              out.w('</div><div class="col-lg-4">');

              ___components_app_thumbnail_template_marko.render({"label": "Thumbnail 3"}, out);

              out.w('</div></div><div class="container"><div class="col-lg-6">');

              ___components_app_form_template_marko.render({}, out);

              out.w('</div><div class="col-lg-6">');

              ___components_app_form_template_marko.render({"variation": "secondary", "layout": "horizontal"}, out);

              out.w('</div></div>');
            });
        }
      });
  };
}
(module.exports = require("marko").c(__filename)).c(create);