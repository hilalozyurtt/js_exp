// ARAYUZ ELEMENTLERI SECELIM
// 1 Kod'a ilk olarak işlem yapılacak elemanları alarak başlıyoruz.
const ad = document.getElementById('ad')
const soyad = document.getElementById('soyad')
const mail = document.getElementById('mail')

const form = document.getElementById('form-rehber')
const kisiListesi = document.querySelector('.kisi-listesi')

// 2 Event listenerler tanımlanacak
form.addEventListener('submit', kaydet)
kisiListesi.addEventListener('click', kisiIslemleriniYap)

// Tüm kisiler için dizi
const tumKisilerDizisi = []
let secilenSatir = undefined

function kisiIslemleriniYap(event) {
    const silinecekTr = event.target.parentElement.parentElement
    const silinecekMail = event.target.parentElement.previousElementSibling.textContent
    if (event.target.classList.contains('btn--delete')) {
        rehberdenSil(silinecekTr, silinecekMail)
    }
    else if (event.target.classList.contains('btn--edit')){
        document.querySelector(".kaydetGuncelle").value = 'Güncelle'
        const secilenTr = event.target.parentElement.parentElement
         
        ad.value = secilenTr.cells[0].textContent
        soyad.value = secilenTr.cells[1].textContent
        mail.value = secilenTr.cells[2].textContent

        secilenSatir = secilenTr
    }

}

function rehberdenSil(silinecekTr, silinecekMail) {
    silinecekTr.remove()
    console.log(silinecekTr, silinecekMail)

    tumKisilerDizisi.forEach((kisi, index) => {
        if (kisi.mail === silinecekMail){
            tumKisilerDizisi.splice(index, 1)
        }
    }) 

    alanlariTemizle()
    document.querySelector(".kaydetGuncelle").value = 'Kaydet'

}

// Listenerların fonk e değer gelir, bunu unutma
function kaydet(e) {
    e.preventDefault()

    const eklenecekKisi = {
        ad: ad.value,
        soyad: soyad.value,
        mail: mail.value
    }

    const sonuc =  verileriKontrolEt(eklenecekKisi)
    if (sonuc['durum']){
        if (secilenSatir){
            kisiyiGuncelle(eklenecekKisi)
        }
        else{
            kisiyiEkle(eklenecekKisi)
        }
    }
    else{
        bilgiOlustur(sonuc['mesaj'], sonuc['durum'])
    }
   
}

function kisiyiGuncelle(eklenecekKisi) {
    // kisi parametresinde secilen kisinin yeni değerleri var
    // secilenSatırda da eski degerler var
    console.log('-------------------------')
    console.log(tumKisilerDizisi)
    for (let i = 0; i < tumKisilerDizisi.length; i++) {
        if (tumKisilerDizisi[i].mail === secilenSatir.cells[2].textContent) {
            tumKisilerDizisi[i] == eklenecekKisi
            break
        }      
    }
    console.log('+++++++++++++++++++++++++')
    console.log(tumKisilerDizisi)

    secilenSatir.cells[0].textContent = eklenecekKisi.ad
    secilenSatir.cells[1].textContent = eklenecekKisi.soyad
    secilenSatir.cells[2].textContent = eklenecekKisi.mail

    document.querySelector('.kaydetGuncelle').value = 'kaydet'
    secilenSatir = undefined 
}

function kisiyiEkle(eklenecekKisi) {
    const olusturulanTrElementi = document.createElement('tr')
    olusturulanTrElementi.innerHTML = `
                        <td>${eklenecekKisi.ad}</td>
                        <td>${eklenecekKisi.soyad}</td>
                        <td>${eklenecekKisi.mail}</td>
                        <td>
                            <button class="btn btn--edit"><i class="far fa-edit" aria-hidden="true"></i></button> 
                            <button class="btn btn--delete"><i class="far fa-trash-alt" aria-hidden="true"></i></button>  
                        </td>`
    
    kisiListesi.appendChild(olusturulanTrElementi)
    tumKisilerDizisi.push(eklenecekKisi)

    bilgiOlustur('Kişi rehbere kaydedildi', true)

}

function verileriKontrolEt(kisi) {
    //objelerde in kullanımı
    for (const deger in kisi) {
        if (kisi[deger]){
            console.log('no problemo');
        }
        else{
            const sonuc = {
                durum: false,
                mesaj: "Boş alan bırakmayınız!"
            }
            return sonuc
        }
    }

    alanlariTemizle()
    return {
        durum: true,
        mesaj: 'Kaydedildi '
    }
    
}

function bilgiOlustur(mesaj, durum) {
    const olusturulanBilgi = document.createElement('div') 
    olusturulanBilgi.textContent = mesaj
    olusturulanBilgi.className = "bilgi"
    olusturulanBilgi.classList.add(durum ? 'bilgi--success' : 'bilgi--error' )

    document.querySelector('.container').insertBefore(olusturulanBilgi, form)

    //setTimeOut, setInterval
    setTimeout(function () {
        const silinecekDiv = document.querySelector('.bilgi')
        if (silinecekDiv) {
            silinecekDiv.remove()
        }
    },2000)

}

function alanlariTemizle() {
    ad.value = '',
    soyad.value = '',
    mail.value = ''
}