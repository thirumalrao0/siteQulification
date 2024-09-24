sap.ui.define([
    "sap/ui/core/mvc/Controller", "sap/ui/model/json/JSONModel", "sap/ui/core/Fragment"
],
    function (Controller, JSONModel, Fragment) {
        "use strict";

        return Controller.extend("rbx.week5.109.controller.View2", {
            onInit: function () {
                this.fModel = this.getOwnerComponent().getModel()
                this.fModel.setDeferredGroups(this.fModel.getDeferredGroups().concat(
                    ["create", "update"]
                ))
                this.allDialogs = {}
                const oRouter = this.getOwnerComponent().getRouter();
                oRouter.getRoute("RouteView2").attachPatternMatched(this.onObjectMatched, this);
                var oModel = new JSONModel({
                    "isEditable": false
                })
                this.getView().setModel(oModel, "edit")
            },
            onObjectMatched(oEvent) {
                this.path = window.decodeURIComponent(oEvent.getParameter("arguments").path)
                this.getView().bindElement({ path: this.path })
                this.getView().getModel("edit").setProperty("isEditable", false)

            },
            addAll(evn) {
                
                  
                    var obj = evn.getSource().getBindingContext().getObject()
                    var smartId= evn.getSource().getParent().getParent().getId()
                    
                    var object;
                    var path;
                    switch (true) {
                        case smartId.endsWith("rdcId"):
                            path="addRDC"
                            object = {
                                Studyid: obj.Studyid
                            }
                            break
                        case smartId.endsWith("trainMid"):
                            path="addTrain"
                            object = {
                                Studyid: obj.Studyid,
                                sicod: obj.SiteCode
                            }
                            break
                        case smartId.endsWith("visitId"):
                            path="addVisit"
                            object = {
                                Studyid: obj.Studyid,
                                sicod: obj.SiteCode
                            }
                            break
                        case smartId.endsWith("actCheckId"):
                            path="addactiveCheck"
                            object = {
                                StudyId: obj.Studyid,
                                SiteCode: obj.SiteCode
                            }
                            break
                        case smartId.endsWith("scbaId"):
                            path="addSCBA"
                            object = {
                                studyid: obj.Studyid,
                                Sitecode: obj.SiteCode
                            }
                            break
                        case smartId.endsWith("EDid"):
                            path="addED"
                            object = {
                                Studyid: obj.Studyid,
                                SiteCode: obj.SiteCode
                            }
                            break

                    }
                    var sPath = evn.getSource().getBindingContext().getPath()
                    var tableBind = evn.getSource().getParent().getParent().getTableBindingPath()
                    var oContext = this.fModel.createEntry(`${sPath}/${tableBind}`, {
                        properties: object
                    })
                    
                    Fragment.load({
                        id:this.getView().getId(),
                        name:"rbx.week5.109.fragments."+path,
                        controller:this

                    }).then((frag)=>{
                        this.getView().addDependent(frag)
                        frag.setBindingContext(oContext)
                        frag.open()

                    })

                   
                



            },
          
            save(evn) {

                this.fModel.submitChanges({
                    success: (obj) => {
                        console.log(obj)
                        this.fModel.resetChanges()

                    },
                    error: (err) => {
                        console.log(err)
                    }

                })
                evn.getSource().getParent().getParent().close()

            },
            onDelete(evn) {
                var gtable = evn.getSource().getParent().getParent().getTable()
                var indices = gtable.getSelectedItems()
                indices.forEach(index => {
                    var sPath = index.getBindingContext().getPath()
                    this.fModel.remove(sPath, {
                        success: (obj) => {
                            evn.getSource().setEnabled(false)
                        }
                    })
                });
            },
            cancelAll(evn) {

                evn.getSource().getParent().getParent().close()
            },
            discard() {
                this.getView().getModel("edit").setProperty("/isEditable", false)
                this.fModel.resetChanges()
            },
            editAll(evn) {

                this.getView().getModel("edit").setProperty("/isEditable", true)


            },
            submit() {
                this.fModel.submitChanges({
                    success: (obj) => {
                        console.log(obj)
                        this.fModel.resetChanges()
                    },
                    error: (err) => {
                        console.log(err)
                    }

                })
                this.getView().getModel("edit").setProperty("/isEditable", false)
            },
            cancelBack() {
                this.fModel.resetChanges()
                this.getView().getModel("edit").setProperty("/isEditable", false)
                this.getOwnerComponent().getRouter().navTo("RouteView1")
            },
           
            onTableSelectionChange(evn) {
                evn.getSource().getParent().getToolbar().getContent()[3].setEnabled(evn.getSource().getSelectedItems().length > 0)
            }
        });
    });
