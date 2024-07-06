import os
import re

# Путь к корневой директории проекта
root_dir = '.'

# Игнорируемые файлы и папки
ignore_dirs = {'node_modules', '.git', 'test', 'dist', 'out'}
ignore_files = {'package-lock.json', '.gitignore', 'minify_project.py', '.prettierrc', 'README.md'}
ignore_exts = {'.css', '.scss'}

# Функция для сжатия кода
def minify_code(code):
    # Удаляем многострочные комментарии
    code = re.sub(r'/\*.*?\*/', '', code, flags=re.DOTALL)
    # Удаляем однострочные комментарии
    code = re.sub(r'//.*', '', code)
    # Удаляем лишние пробелы и переносы строк
    code = re.sub(r'\s+', ' ', code)
    return code.strip()

# Максимальное количество токенов в файле
MAX_TOKENS_PER_FILE = 3000

# Сбор всех файлов в проекте
all_files = []
for dirpath, dirnames, filenames in os.walk(root_dir):
    # Игнорируем скрытые папки и файлы
    dirnames[:] = [d for d in dirnames if d not in ignore_dirs and not d.startswith('.')]
    filenames = [f for f in filenames if f not in ignore_files and not f.startswith('.') and os.path.splitext(f)[1] not in ignore_exts]

    for filename in filenames:
        all_files.append(os.path.join(dirpath, filename))

# Запись кода в файлы
file_count = 1
current_token_count = 0
current_file = open(f'project_code_{file_count}.txt', 'w', encoding='utf-8')

for file in all_files:
    try:
        with open(file, 'r', encoding='utf-8') as input_file:
            code = input_file.read()
            minified_code = minify_code(code)
            
            # Получаем относительный путь файла относительно корневой папки проекта
            relative_path = os.path.relpath(file, root_dir)

            # Записываем заголовок файла
            current_file.write(f"/* ----- {relative_path} ----- */\n")
            
            # Проверяем, превышает ли добавление текущего файла максимальное количество токенов
            if current_token_count + len(minified_code.split()) > MAX_TOKENS_PER_FILE:
                current_file.close()  # закрываем текущий файл
                file_count += 1
                current_file = open(f'project_code_{file_count}.txt', 'w', encoding='utf-8')  # открываем новый файл
                current_token_count = 0  # сбрасываем счетчик токенов для нового файла
            
            current_file.write(minified_code + '\n\n')  # добавляем две новые строки после каждого файла
            current_token_count += len(minified_code.split())
    except UnicodeDecodeError:
        print(f"Ошибка при чтении файла {file}: файл не может быть декодирован как UTF-8. Пропускаем.")

current_file.close()

print("Код успешно записан в файлы.")
