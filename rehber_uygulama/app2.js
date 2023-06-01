class Kisi{
    constructor(ad, soyad, mail){
        this.ad = ad,
        this.soyad = soyad,
        this.mail = mail
    }
}

class Ekran{
    constructor(){
        this.ad = document.getElementById('ad'),
        this.soyad = document.getElementById('soyad'),
        this.mail = document.getElementById('mail'),
        this.ekleGuncelleButton = document.querySelector('.kaydetGuncelle')
        this.form = document.getElementById('form-rehber').addEventListener('submit', kaydetG)
        this.depo = new Depo()
    }
}

class Depo{
    constructor() {
        this.tumKisiler = []
    }
    
    kisileriGetir(){
        let tumKisilerLocal
        if (localStorage.getItem('tumKisiler') === null) {
            tumKisilerLocal = []
        }
        else{
            tumKisilerLocal = JSON.parse(localStorage.getItem('tumKisiler'))
        }
        this.tumKisiler = tumKisilerLocal
        return tumKisilerLocal
    }

    kisiEkle(kisi){
        const tumKisilerLocal = this.kisileriGetir()
        tumKisilerLocal.push(kisi)
        localStorage.setItem('tumKisiler', JSON.stringify(tumKisilerLocal))
    }


}