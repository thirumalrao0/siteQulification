sap.ui.define([
    "sap/ui/core/mvc/Controller", "sap/ui/core/Fragment"

],
    function (Controller, Fragment) {
        "use strict";

        return Controller.extend("rbx.week5.109.controller.View1", {
            onInit: function () {
                this.fModel = this.getOwnerComponent().getModel()
                this.fModel.setDeferredGroups(this.fModel.getDeferredGroups().concat(
                    ["create", "update"]
                ))
            },
            nextPage(oEvent) {
                const oItem = oEvent.getSource();
                const oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo("RouteView2", {
                    path: window.encodeURIComponent(oItem.getBindingContext().getPath())

                })
            },
            addDialog() {
                var oContext = this.fModel.createEntry("/SiteQualification", { groupId: "create" })
                Fragment.load({
                    id: this.getView().getId(),
                    name: "rbx.week5.109.fragments.add",
                    controller: this
                }).then((frag) => {
                    this.getView().addDependent(frag)
                    frag.setBindingContext(oContext)
                    frag.open()
                })
            },
            onAdd(evn) {
                this.fModel.submitChanges()
                evn.getSource().getParent().getParent().close()
            },
            cancel(evn) {
                evn.getSource().getParent().getParent().close()
            },
            onDelete(evn) {
                var indices = this.byId("smartTable").getTable().getSelectedItems()
                indices.forEach(index => {
                    var sPath = index.getBindingContext().getPath()
                    this.fModel.remove(sPath)
                    evn.getSource().setEnabled(false)
                });
            },
            onTableSelectionChange(evn) {
                evn.getSource().getParent().getToolbar().getContent()[3].setEnabled(evn.getSource().getSelectedItems().length > 0)
            }


        });
    });
