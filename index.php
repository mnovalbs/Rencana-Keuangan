<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Rencana Keuangan - Mahasiswa.id</title>
    <link href='semantic/semantic.min.css' rel='stylesheet'/>
    <link href='font-awesome/css/font-awesome.min.css' rel='stylesheet'/>
    <link href='css/style.css' rel='stylesheet'/>

    <meta name='description' content='Rencana keuangan mahasiswa Indonesia. Mahasiswa.id merupakan sebuah portal website untuk mahasiswa yang akan membantu mahasiswa dalam menjalankan kehidupannya sebagai mahasiswa. Mahasiswa.id akan memberikan beberapa layanan yang sangat berguna untuk mahasiswa.'/>
    <meta name='keywords' content='mahasiswa, blog, beasiswa'/>
    <meta name='viewport' content='width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0'/>

    <!-- SEO Meta Tag -->
    <meta name="robots" content="noodp"/>
    <meta content='all-language' http-equiv='Content-Language'/>
    <meta content='global' name='distribution'/>
    <meta content='global' name='target'/>
    <meta content='all' name='robots'/>
    <meta content='true' name='MSSmartTagsPreventParsing'/>
    <meta content='never' name='Expires'/>
    <meta content='id' name='language'/>
    <meta content='id' name='geo.country'/>
    <meta content="general" name="rating"/>
    <meta content="all" name="robots"/>
    <meta content="Indonesia" name="geo.placename"/>
    <meta content="1 days" name="revisit-after"/>
    <meta content="blogger" name="generator"/>
    <meta content="index, follow" name="googlebot"/>
    <meta content="follow, all" name="Googlebot-Image"/>
    <meta content="follow, all" name="msnbot"/>
    <meta content="follow, all" name="Slurp"/>
    <meta content="follow, all" name="ZyBorg"/>
    <meta content="follow, all" name="Scooter"/>
    <meta content="all" name="spiders"/>
    <meta content="all" name="WEBCRAWLERS"/>

    <!-- Open Graph Data -->
    <meta property="og:type" content="website" />
    <meta property="og:title" content="Mahasiswa.id #Mahasiswa Online Partner"/>
    <!-- <meta property="og:url" content="http://mahasiswa.id/blog/" /> -->
    <meta property="og:url" content="http://mahasiswa.id/" />
    <meta property="og:site_name" content="Mahasiswa.id" />
    <!--<meta property="og:image" content=""/>-->

    <!-- Twitter Card Data -->
    <meta name="twitter:card" content="summary"/>
    <meta name="twitter:title" content="Mahasiswa.id #Mahasiswa Online Partner"/>
    <meta name='twitter:description' content="Rencana keuangan mahasiswa Indonesia. Mahasiswa.id merupakan sebuah portal website untuk mahasiswa yang akan membantu mahasiswa dalam menjalankan kehidupannya sebagai mahasiswa. Mahasiswa.id akan memberikan beberapa layanan yang sangat berguna untuk mahasiswa."/>

    <!-- Schema.org markup for Google+ -->
    <meta itemprop="name" content="Mahasiswa.id #Mahasiswa Online Partner">
    <meta itemprop="description" content="Rencana keuangan mahasiswa Indonesia. Mahasiswa.id merupakan sebuah portal website untuk mahasiswa yang akan membantu mahasiswa dalam menjalankan kehidupannya sebagai mahasiswa. Mahasiswa.id akan memberikan beberapa layanan yang sangat berguna untuk mahasiswa.">
  </head>
  <body>

    <div class='ui container align-center'>
      <h2 class="header">Hitung Rencana Keuangan <span class="mahasiswa-text">Mahasiswa</span><span class="id-text">.id</span></h2>
      <div id='errors'></div>
      <div class='dalam'>
        <div class='ui form'>
          <div id='nama-pemilik'>
            <div class='field'>
              <label>Nama Pemilik Rencana : </label>
              <input name='nama_pemilik' placeholder='Nama pemilik rencana' required pattern="[a-zA-Z ]{3,30}"/>
            </div>
            <button class='ui button primary' onclick='nextRencana()'>Lanjut <i class='fa fa-arrow-right'></i></button>
          </div>

          <div id='hilang'>
            <b>Nama Pemilik : </b><span id='nama_pemilik'></span>
            <p><b>Total : </b><span id='total'></span></p>
          </div>

          <div id='rencana-bulan' class='bagian'>
            <div class='field'>
              <label>Tanggal Mulai Menabung : </label>
              <input type='date' id='tanggal-mulai'/>
            </div>
            <div class='field'>
              <label>Tanggal Selesai Menabung : </label>
              <input type='date' id='tanggal-selesai'/>
            </div>
            <button class='ui button primary' onclick='nextKeuangan()'>Lanjut <i class='fa fa-arrow-right'></i></button>
          </div>

          <div id='rencana-keuangan' class='bagian'>
            <div class='field'>
              <label>Target : </label>
              <input id='target' placeholder='ex: Beli rumah' maxlength="50"/>
            </div>
            <div class='field'>
              <label>Biaya : </label>
              <input id='biaya' value='1000000000' type='number' min='0' max='10000000000'/>
            </div>
            <button class='ui button red' onclick='tambah()'>Tambah <i class='fa fa-plus'></i></button>
            <button class='ui button primary' onclick='hitung()'>Hasil <i class='fa fa-arrow-right'></i></button>
          </div>

          <div id='hasil' class='bagian'>
            <table class='ui table'>
              <thead>
                <tr>
                  <th>No</th>
                  <th>Target</th>
                  <th>Biaya</th>
                </tr>
              </thead>
              <tbody id='bodyhasil'>

              </tbody>
            </table>
            <p><b>Tanggal mulai</b> : <span id='text-tanggal-mulai'></span></p>
            <p><b>Tanggal selesai</b> : <span id='text-tanggal-selesai'></span></p>
            <div id='tgl'></div>
          </div>

        </div>
      </div>

      <div style='text-align:center;'>
        <small>Developed &amp; Designed by <a href='mailto:noval@mahasiswa.id'>noval@mahasiswa.id</a></small>
      </div>

    </div>

    <script src='js/jquery.min.js'></script>
    <script src='js/global.js'></script>
  </body>
</html>
