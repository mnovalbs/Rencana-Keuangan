$(window).bind("load resize",function(){
  if($(window).height() > $(".container").height()){
    $(".container").css("top",(($(window).height()-$(".container").height())/2)-30);
  }
});

$(document).ready(function(){
  $(".bagian, #hilang").hide();
});

var diEncrypt = Date.now()+(Math.random()*1000);

var total = 0;
var nama_pemilik = "";
var rencana = [];
var tgl_mulai = "";
var tgl_selesai = "";
var penentu = SHA1(diEncrypt.toString());

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

    // $.ajax({
    //   type: 'POST',
    //   url: '/lokasi/',
    //   data: {province: provinsi},
    //   success: function(data){
    //     $("#kota").html("");
    //     $.each(data, function(index, element){
    //       $("#kota").append("<option value='"+element.id_kota+"'>"+element.nama_kota+" "+element.tipe+"</option>");
    //     });
    //   }
    // })

    $.post("simpan.php",{id_penentu:penentu, nama:nama_pemilik});

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
      $.post('simpan.php',{id_penentu:penentu,tanggal_mulai:tgl_mulai,tanggal_selesai:tgl_selesai});
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
    $.post("simpan.php",{id_penentu:penentu, target:target, biaya:biaya});
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

    // $.ajax({
    //   type: 'POST',
    //   url: '/lokasi/',
    //   data: {province: provinsi},
    //   dataType: 'json',
    //   success: function(data){
    //     $("#kota").html("");
    //     $.each(data, function(index, element){
    //       $("#kota").append("<option value='"+element.id_kota+"'>"+element.nama_kota+" "+element.tipe+"</option>");
    //     });
    //   }
    // })

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
    $("#tgl").append("<p><b>Menabung per Tahun</b> : "+toRupiah(hitungPerTahun(tahun))+"</p>");
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

function SHA1(msg) {
  function rotate_left(n,s) {
    var t4 = ( n<<s ) | (n>>>(32-s));
    return t4;
  };
  function lsb_hex(val) {
    var str="";
    var i;
    var vh;
    var vl;
    for( i=0; i<=6; i+=2 ) {
      vh = (val>>>(i*4+4))&0x0f;
      vl = (val>>>(i*4))&0x0f;
      str += vh.toString(16) + vl.toString(16);
    }
    return str;
  };
  function cvt_hex(val) {
    var str="";
    var i;
    var v;
    for( i=7; i>=0; i-- ) {
      v = (val>>>(i*4))&0x0f;
      str += v.toString(16);
    }
    return str;
  };
  function Utf8Encode(string) {
    string = string.replace(/\r\n/g,"\n");
    var utftext = "";
    for (var n = 0; n < string.length; n++) {
      var c = string.charCodeAt(n);
      if (c < 128) {
        utftext += String.fromCharCode(c);
      }
      else if((c > 127) && (c < 2048)) {
        utftext += String.fromCharCode((c >> 6) | 192);
        utftext += String.fromCharCode((c & 63) | 128);
      }
      else {
        utftext += String.fromCharCode((c >> 12) | 224);
        utftext += String.fromCharCode(((c >> 6) & 63) | 128);
        utftext += String.fromCharCode((c & 63) | 128);
      }
    }
    return utftext;
  };
  var blockstart;
  var i, j;
  var W = new Array(80);
  var H0 = 0x67452301;
  var H1 = 0xEFCDAB89;
  var H2 = 0x98BADCFE;
  var H3 = 0x10325476;
  var H4 = 0xC3D2E1F0;
  var A, B, C, D, E;
  var temp;
  msg = Utf8Encode(msg);
  var msg_len = msg.length;
  var word_array = new Array();
  for( i=0; i<msg_len-3; i+=4 ) {
    j = msg.charCodeAt(i)<<24 | msg.charCodeAt(i+1)<<16 |
    msg.charCodeAt(i+2)<<8 | msg.charCodeAt(i+3);
    word_array.push( j );
  }
  switch( msg_len % 4 ) {
    case 0:
      i = 0x080000000;
    break;
    case 1:
      i = msg.charCodeAt(msg_len-1)<<24 | 0x0800000;
    break;
    case 2:
      i = msg.charCodeAt(msg_len-2)<<24 | msg.charCodeAt(msg_len-1)<<16 | 0x08000;
    break;
    case 3:
      i = msg.charCodeAt(msg_len-3)<<24 | msg.charCodeAt(msg_len-2)<<16 | msg.charCodeAt(msg_len-1)<<8  | 0x80;
    break;
  }
  word_array.push( i );
  while( (word_array.length % 16) != 14 ) word_array.push( 0 );
  word_array.push( msg_len>>>29 );
  word_array.push( (msg_len<<3)&0x0ffffffff );
  for ( blockstart=0; blockstart<word_array.length; blockstart+=16 ) {
    for( i=0; i<16; i++ ) W[i] = word_array[blockstart+i];
    for( i=16; i<=79; i++ ) W[i] = rotate_left(W[i-3] ^ W[i-8] ^ W[i-14] ^ W[i-16], 1);
    A = H0;
    B = H1;
    C = H2;
    D = H3;
    E = H4;
    for( i= 0; i<=19; i++ ) {
      temp = (rotate_left(A,5) + ((B&C) | (~B&D)) + E + W[i] + 0x5A827999) & 0x0ffffffff;
      E = D;
      D = C;
      C = rotate_left(B,30);
      B = A;
      A = temp;
    }
    for( i=20; i<=39; i++ ) {
      temp = (rotate_left(A,5) + (B ^ C ^ D) + E + W[i] + 0x6ED9EBA1) & 0x0ffffffff;
      E = D;
      D = C;
      C = rotate_left(B,30);
      B = A;
      A = temp;
    }
    for( i=40; i<=59; i++ ) {
      temp = (rotate_left(A,5) + ((B&C) | (B&D) | (C&D)) + E + W[i] + 0x8F1BBCDC) & 0x0ffffffff;
      E = D;
      D = C;
      C = rotate_left(B,30);
      B = A;
      A = temp;
    }
    for( i=60; i<=79; i++ ) {
      temp = (rotate_left(A,5) + (B ^ C ^ D) + E + W[i] + 0xCA62C1D6) & 0x0ffffffff;
      E = D;
      D = C;
      C = rotate_left(B,30);
      B = A;
      A = temp;
    }
    H0 = (H0 + A) & 0x0ffffffff;
    H1 = (H1 + B) & 0x0ffffffff;
    H2 = (H2 + C) & 0x0ffffffff;
    H3 = (H3 + D) & 0x0ffffffff;
    H4 = (H4 + E) & 0x0ffffffff;
  }
  var temp = cvt_hex(H0) + cvt_hex(H1) + cvt_hex(H2) + cvt_hex(H3) + cvt_hex(H4);

  return temp.toLowerCase();
}
