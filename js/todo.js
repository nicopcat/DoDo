$(function () {
    loadData();

    $("#title").on("keydown", function (e) {
        //1.按下回车 把完整数据储存在localStorage
        //储存数据的格式 var todolist = [{title:"xxx", done:false}]
        //e.which或者e.keyCode
        if (e.which === 13) {
            if ($(this).val() == "") {
                return false;
            } else {
                //读取本地储存的数据
                var local = getData();
                //把最新数据追加到local数组中 实现更替
                local.push({ "title": $(this).val(), "done": false });
                //把新数组存储
                saveData(local);
                loadData();
                $(this).val("");
            }
        };
    });



    $("form").on("click", ".btn", function () {
        if ($("#title").val() == "") {
            return false;
        } else {
            //读取本地储存的数据
            var local = getData();
            //把最新数据追加到local数组中 实现更替
            local.push({ "title": $("#title").val(), "done": false });
            //把新数组存储
            saveData(local);
            loadData();
            $("#title").val("");
        }
    })


    $("ol,ul").on("click", "a", function () {
        //获取本地存储
        var data = getData();
        //修改数据
        var id = $(this).attr("id");
        data.splice(id, 1);
        //保存在本地存储
        saveData(data);
        //重新渲染页面
        loadData();
    });

    //todolist 正在进行和已完成选项操作
    $("ol, ul").on("click", "input", function () {
        //获取本地存储
        var data = getData();
        //修改数据 获取当前input的索引号
        var index = $(this).siblings("a").attr("id");
        data[index].done = $(this).prop("checked");
        //保存在本地存储
        saveData(data);
        //重新渲染页面
        loadData();
    });

    //修改
    $("ol").on("click", "p", function () {
        $(this).attr("contenteditable", true);
        $(this).on("keydown", function (e) {
            if (e.which === 13) {
                if ($(this).html() !== "") {
                    var id = $(this).siblings("a").attr("id");
                    var local = getData();
                    //splice(index,len,[item]) 以替换为新内容
                    local.splice(id, 1, { "title": $(this).html(), "done": false });
                    saveData(local);
                    loadData();
                } else {
                    return false;
                }
            };
        });
    });

    //时间
    function getFormatDate() {
        var nowDate = new Date();

        var month = nowDate.getMonth() + 1 < 10 ? "0" + (nowDate.getMonth() + 1) : nowDate.getMonth() + 1;
        var date = nowDate.getDate() < 10 ? "0" + nowDate.getDate() : nowDate.getDate();
        return month + "月" + date + "日";
    }
    var str = getFormatDate();
    $("em").text(str);


    //====函数封装====
    function getData() {
        var datas = localStorage.getItem("todolist");
        if (datas !== null) {
            return JSON.parse(datas);
        } else {
            return [];
        }
    };

    function saveData(dataSaving) {
        localStorage.setItem("todolist", JSON.stringify(dataSaving));
    };

    function loadData() {
        var data = getData();
        //遍历前先清空ol里的内容
        $("ol,ul").empty();
        var todocount = donecount = 0;
        $.each(data, function (i, domE) {
            if (domE.done) {
                $("ul").prepend($("<li><input type='checkbox' checked='checked'><p>" + domE.title + "</p><a href='javascript:;' id= '" + i + "'></a></li>")).fadeIn();
                donecount++;

            } else {
                $("ol").prepend($("<li><input type='checkbox'><p>" + domE.title + "</p><em id='date'>1</em> <a href='javascript:;' id= '" + i + "'></a></li>")).fadeIn();
                todocount++;
            }
        });
        $("#todocount").html(todocount);
        $("#donecount").html(donecount);
        if (todocount == 0) {
            $(".note").show();
            if (donecount !== 0) {
                $(".great").html('貌似任务全都完成辣👍').show();
            }
        } else {
            $(".note").hide();
            $(".great").hide();
        }
    };

})
