import sqlite3

def sendToDatabase(id, brandName):
    conn = sqlite3.connect('../dev.db')

    try:
        c = conn.cursor()

        c.execute(f"INSERT INTO MarcaImagem (nome, imagemProcessadaId) values ('{brandName}', {id})")
        c.execute(f"UPDATE ImagemProcessada SET status = 'PROCESSED' WHERE id = {id}")

        conn.commit()

        conn.close()
    except Exception as e:
        conn.rollback()
        print(e)