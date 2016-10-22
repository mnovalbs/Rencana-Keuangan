$(window).bind("load resize",function(){
  if($(window).height() > $(".container").height()){
    $(".container").css("top",(($(window).height()-$(".container").height())/2)-50);
  }
});

$(document).ready(function(){
  $(".bagian, #hilang").hide();
});

var total = 0;
var nama_pemilik = "";
var rencana = [];
var tgl_mulai = "";
var tgl_selesai = "";

function Rencana(nama,isi)
{
  this.nama = nama;
  this.isi = isi;
}

function nextRencana()
{
  var in_nama_pemilik = $("#nama-pemilik input").val();

  if(in_nama_pemilik)
  {
    reset_error();
    nama_pemilik = in_nama_pemilik;
    $("#nama_pemilik").text(nama_pemilik);
    $("#nama-pemilik input").prop('disabled', true);

    $("#nama-pemilik").fadeOut("slow",function(){
      $("#hilang").fadeIn("slow");
      $("#rencana-bulan").fadeIn("slow");
    });
  }
  else
  {
    set_error('negative','Nama harus terisi');
  }

}

function nextKeuangan()
{
  var tanggal_mulai = $("#tanggal-mulai").val();
  var tanggal_selesai = $("#tanggal-selesai").val();

  if( tanggal_mulai && tanggal_selesai )
  {
    var start = new Date(tanggal_mulai),
        end   = new Date(tanggal_selesai),
        diff  = new Date(end-start),
        days  = diff/1000/60/60/24;

    days = parseInt(days);

    if(days>0)
    {
      tgl_mulai = tanggal_mulai;
      tgl_selesai = tanggal_selesai;
      $("#rencana-bulan").fadeOut("slow",function(){
        $("#rencana-keuangan").fadeIn("slow");
      });
    }
    else
    {
      set_error('negative','Tanggal mulai dan selesai harus minimal berbeda satu hari');
    }
  }
  else
  {
    set_error('negative','Tanggal mulai dan tanggal selesai harus terpilih');
  }

}

function tambah()
{
  var target = $("#target").val();
  var biaya = $("#biaya").val();
  biaya = parseInt(biaya);

  if( target && biaya )
  {
    $("#target").val("");
    $("#biaya").val(1000000000);
    var ob_rencana = new Rencana(target,biaya);
    rencana.push(ob_rencana);
    total += biaya;
    new_total();
  }
  else
  {
    set_error('negative','Target dan biaya harus terisi');
  }
}

function hitung()
{
  if(total!=0)
  {
    $("#rencana-keuangan").fadeOut("slow",function(){
      $("#hasil").fadeIn("slow");
    });
    hasil();
  }
  else
  {
    set_error('negative','Silahkan tambah target kamu');
  }
}

function hasil()
{
  var no = 1;
  $.each(rencana, function(index, value){
    $("#bodyhasil").append("<tr><td>"+no+"</td><td>"+value.nama+"</td><td>"+toRupiah(value.isi)+"</td></tr>");
    no++;
  });
  $("#bodyhasil").append("<tr><td></td><td></td><td>"+toRupiah(total)+"</td></tr>");
  $("#text-tanggal-mulai").html(tgl_mulai);
  $("#text-tanggal-selesai").html(tgl_selesai);

  var start = new Date(tgl_mulai),
      end   = new Date(tgl_selesai),
      diff  = new Date(end-start),
      days  = diff/1000/60/60/24;

  days = parseInt(days);

  tahun = parseInt(days/365);
  bulan = parseInt(days/30);

  if( tahun > 0 )
  {
    $("#tgl").append("<p><b>Menabung per Tahun</b> : "+toRupiah(itungPerTahun(tahun))+"</p>");
  }

  if( bulan > 0 )
  {
    $("#tgl").append("<p><b>Menabung per Bulan</b> : "+toRupiah(hitungPerBulan(bulan))+"</p>");
  }

  if( days > 0 )
  {
    $("#tgl").append("<p><b>Menabung per Hari</b> : "+toRupiah(hitungPerHari(days))+"</p>");
  }

}

function hitungPerTahun(tahuns)
{
  return total/tahuns;
}

function hitungPerBulan(bulans)
{
  return total/bulans;
}

function hitungPerHari(haris)
{
  return total/haris;
}

function reset_error()
{
  $("#errors").html("");
}

function set_error(tipe,str)
{
  $("#errors").html('<div class="ui '+tipe+' message" role="alert"><div class="header">'+str+'</div></div>');
}

function new_total()
{
  total = 0;
  $.each(rencana, function(index,value){
    total += value.isi;
  });
  $("#total").text(toRupiah(total));
}

function set_total(new_total)
{
  total = new_total;
  $("#total").text(toRupiah(total));
}

function toRupiah(isi)
{
  return 'Rp '+isi.toFixed(0).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");
}
