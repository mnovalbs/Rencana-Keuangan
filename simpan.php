<?php
  $koneksi = mysqli_connect('localhost','root','root','mhs_rencana_keuangan');

  if( !empty($_POST['id_penentu']) )
  {

    $id_penentu = $koneksi->real_escape_string($_POST['id_penentu']);
    $waktu = date("Y-m-d h:i:s");

    if(!empty($_POST['nama']))
    {
      $nama = $koneksi->real_escape_string($_POST['nama']);
      $koneksi->query("INSERT INTO pemilik (id_penentu,nama_pemilik,waktu) VALUES('$id_penentu','$nama','$waktu')");
    }

    if(!empty($_POST['target']) && !empty($_POST['biaya']))
    {
      $target = $koneksi->real_escape_string($_POST['target']);
      $biaya = (int)$_POST['biaya'];

      $koneksi->query("INSERT INTO detail(id_penentu, target, biaya) VALUES('$id_penentu','$target',$biaya)");
    }

    if( !empty($_POST['tanggal_mulai']) && !empty($_POST['tanggal_selesai']))
    {
      $tanggal_mulai = $koneksi->real_escape_string($_POST['tanggal_mulai']);
      $tanggal_selesai = $koneksi->real_escape_string($_POST['tanggal_selesai']);

      $koneksi->query("INSERT INTO tanggal(id_penentu,tanggal_mulai,tanggal_selesai) VALUES('$id_penentu','$tanggal_mulai','$tanggal_selesai')");
    }

  }
