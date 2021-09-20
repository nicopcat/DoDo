$(function () {
    loadData();
    $("#title").on("keydown", function (e) {
        //1.按下回车 把完整数据储存在localStorage
        //储存数据的格式 var todolist = [{title:"xxx", done:false}]
        if (e.keyCode === 13) {
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
                $("ul").prepend($("<li><input type='checkbox' checked='checked'><p>" + domE.title + "</p><a href='javascript:;' id= '" + i + "'></a></li>"));
                donecount++;

            } else {
                $("ol").prepend($("<li><input type='checkbox'><p>" + domE.title + "</p><a href='javascript:;' id= '" + i + "'></a></li>"));
                todocount++;

            }

        })
        $("#todocount").html(todocount);
        $("#donecount").html(donecount);
        if (todocount == 0) {
            $(".great").html('貌似任务全都完成辣👍');
            $(".great").show();
        } else {
            $(".great").hide();
        }

    };
})