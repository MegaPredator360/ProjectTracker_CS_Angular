import _ from 'lodash';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, {
  JSXElementConstructor,
  ReactElement,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  Dimensions,
  FlatList,
  I18nManager,
  Image,
  Keyboard,
  KeyboardEvent,
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
  StatusBar,
  Animated,
} from 'react-native';
import { useDetectDevice } from 'react-native-element-dropdown/src/toolkits';

import { useDeviceOrientation } from 'react-native-element-dropdown/src/useDeviceOrientation';
import CInput from 'react-native-element-dropdown/src/components/TextInput';
import { MatDropdownProps } from './model';
import { styles } from 'react-native-element-dropdown/src/components/Dropdown/styles';
import { MatStyles } from './styles';
import { useColorScheme } from '@/hooks/useColorScheme';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import MatDivider from '../matDivider/matDivider';

const { isTablet } = useDetectDevice;
const ic_down = require('../../../node_modules/react-native-element-dropdown/src/assets/down.png');

const statusBarHeight: number = StatusBar.currentHeight || 0;

const MatDropdown: <T>(
  props: MatDropdownProps<T>
) => ReactElement<any, string | JSXElementConstructor<any>> | null =
  React.forwardRef((props, currentRef) => {
    const orientation = useDeviceOrientation();
    const {
      testID,
      itemTestIDField,
      onChange,
      style = {},
      containerStyle,
      placeholderStyle,
      selectedTextStyle,
      itemContainerStyle,
      itemTextStyle,
      inputSearchStyle,
      iconStyle,
      selectedTextProps = {},
      data = [],
      labelField,
      valueField,
      searchField,
      value,
      fontColor = '#8E7CC3',
      fontFamily,
      highlightColor = 'rgba(174, 157, 224, 0.2)',
      searchPlaceholder,
      placeholder = 'Select item',
      search = false,
      maxHeight = 340,
      minHeight = 0,
      disable = false,
      keyboardAvoiding = true,
      inverted = true,
      renderLeftIcon,
      renderRightIcon,
      renderItem,
      renderInputSearch,
      onFocus,
      onBlur,
      autoScroll = true,
      showsVerticalScrollIndicator = true,
      dropdownPosition = 'auto',
      flatListProps,
      searchQuery,
      backgroundColor,
      onChangeText,
      confirmSelectItem,
      onConfirmSelectItem,
      accessibilityLabel,
      itemAccessibilityLabelField,
      mode = 'default',
    } = props;

    const ref = useRef<View>(null);
    const refList = useRef<FlatList>(null);
    const [visible, setVisible] = useState<boolean>(false);
    const [currentValue, setCurrentValue] = useState<any>(null);
    const [listData, setListData] = useState<any[]>(data);
    const [position, setPosition] = useState<any>();
    const [keyboardHeight, setKeyboardHeight] = useState<number>(0);
    const [searchText, setSearchText] = useState('');
    const [focused, setFocused] = useState(false);
    const labelPosition = useRef(new Animated.Value(10)).current;
    const labelFontSize = useRef(new Animated.Value(16)).current;

    // Para el modo oscuro
    const colorScheme = useColorScheme();
    const bgColor = colorScheme === 'light' ? '#EDEDED' : "#202020";
    const dropdownColor = colorScheme === 'light' ? '#FFFFFF' : "#191919";
    const bgColorFocus = colorScheme === 'light' ? '#E0E0E0' : "#282828";
    const borderColor = colorScheme === 'light' ? '#D3D3D3' : "#333333";
    const labelColor = colorScheme === 'light' ? '#808080' : "#707070";
    const selectItemColor = colorScheme === 'light' ? '#EDEDED' : "#282828";

    const { width: W, height: H } = Dimensions.get('window');
    const styleContainerVertical: ViewStyle = useMemo(() => {
      return {
        backgroundColor: 'rgba(0,0,0,0.1)',
        alignItems: 'center',
      };
    }, []);
    const styleHorizontal: ViewStyle = useMemo(() => {
      return {
        width: orientation === 'LANDSCAPE' ? W / 2 : '100%',
        alignSelf: 'center',
      };
    }, [W, orientation]);

    useImperativeHandle(currentRef, () => {
      return { open: eventOpen, close: eventClose };
    });

    useEffect(() => {
      return eventClose;
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
      setListData([...data]);
      if (searchText) {
        onSearch(searchText);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data, searchText]);

    const eventOpen = () => {
      if (!disable) {
        setVisible(true);
        if (onFocus) {
          onFocus();
        }

        if (searchText.length > 0) {
          onSearch(searchText);
        }
        scrollIndex();
      }
    };

    const eventClose = useCallback(() => {

      if (!disable) {
        setVisible(false);
        if (onBlur) {
          onBlur();
        }
      }
    }, [disable, onBlur]);

    const font = useCallback(() => {
      if (fontFamily) {
        return {
          fontFamily: fontFamily,
        };
      } else {
        return {};
      }
    }, [fontFamily]);

    const _measure = useCallback(() => {
      if (ref && ref?.current) {
        ref.current.measureInWindow((pageX, pageY, width, height) => {
          let isFull = isTablet
            ? false
            : mode === 'modal' || orientation === 'LANDSCAPE';

          if (mode === 'auto') {
            isFull = false;
          }

          const top = isFull ? 20 : height + pageY + 2;
          const bottom = H - top + height;
          const left = I18nManager.isRTL ? W - width - pageX : pageX;

          setPosition({
            isFull,
            width: Math.floor(width),
            top: Math.floor(top + statusBarHeight),
            bottom: Math.floor(bottom - statusBarHeight),
            left: Math.floor(left),
            height: Math.floor(height),
          });
        });
      }
    }, [H, W, orientation, mode]);

    const onKeyboardDidShow = useCallback(
      (e: KeyboardEvent) => {
        _measure();
        setKeyboardHeight(e.endCoordinates.height);
      },
      [_measure]
    );

    const onKeyboardDidHide = useCallback(() => {
      setKeyboardHeight(0);
      _measure();
    }, [_measure]);

    useEffect(() => {
      const susbcriptionKeyboardDidShow = Keyboard.addListener(
        'keyboardDidShow',
        onKeyboardDidShow
      );
      const susbcriptionKeyboardDidHide = Keyboard.addListener(
        'keyboardDidHide',
        onKeyboardDidHide
      );

      return () => {
        if (typeof susbcriptionKeyboardDidShow?.remove === 'function') {
          susbcriptionKeyboardDidShow.remove();
        }

        if (typeof susbcriptionKeyboardDidHide?.remove === 'function') {
          susbcriptionKeyboardDidHide.remove();
        }
      };
    }, [onKeyboardDidHide, onKeyboardDidShow]);

    const getValue = useCallback(() => {
      // Se declara un valor por defecto que tomará el valor seleccionado
      const defaultValue = typeof value === 'object' ? _.get(value, valueField) : value;

      // Se buscará el item que coincida con defaultValue
      const getItem = data.filter((e) => {
        // defaultValue se convierte a number
        return _.isEqual(Number(defaultValue), _.get(e, valueField));
      });

      // Verificar si getItem tiene elementos
      if (getItem.length > 0) {
        setCurrentValue(getItem[0]);
      } else {
        setCurrentValue(null);
      }
    }, [data, value, valueField]);

    useEffect(() => {
      getValue();
    }, [value, data, getValue]);


    const scrollIndex = useCallback(() => {
      if (autoScroll && data.length > 0 && listData.length === data.length) {
        setTimeout(() => {
          if (refList && refList?.current) {
            const defaultValue =
              typeof value === 'object' ? _.get(value, valueField) : value;

            const index = _.findIndex(listData, (e: any) =>
              _.isEqual(defaultValue, _.get(e, valueField))
            );
            if (
              listData.length > 0 &&
              index > -1 &&
              index <= listData.length - 1
            ) {
              refList?.current?.scrollToIndex({
                index: index,
                animated: false,
              });
            }
          }
        }, 200);
      }
    }, [autoScroll, data.length, listData, value, valueField]);

    // Metodo para mostrar el dropdown
    const showOrClose = useCallback(() => {

      // Verificar si el dropdown está deshabilitado
      if (!disable) {

        if (keyboardHeight > 0 && visible) {
          return Keyboard.dismiss();
        }

        _measure();
        setVisible(!visible);
        setListData(data);

        if (!visible) {

          // Se abre el dropdown
          if (onFocus) {
            onFocus();
          }

          setFocused(true)
          activarLabel()
        } else {

          if (onBlur) {
            onBlur();
          }

          if (value == 0) {
            setFocused(false);
            desactivarLabel()
          }
          else {
            setFocused(false)
          }
        }

        // Verificar el campo de busqueda
        if (searchText.length > 0) {
          onSearch(searchText);
        }
        scrollIndex();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
      disable,
      keyboardHeight,
      visible,
      _measure,
      data,
      searchText,
      scrollIndex,
      onFocus,
      onBlur,
    ]);

    // Realizar animación inicial
    const activarLabel = () => {
      Animated.parallel([
        Animated.timing(labelPosition, {
          toValue: 0,
          duration: 200,
          useNativeDriver: false,
        }),
        Animated.timing(labelFontSize, {
          toValue: 10,
          duration: 200,
          useNativeDriver: false,
        })
      ]).start();
    }

    // Realiza animación final
    const desactivarLabel = () => {
      Animated.parallel([
        Animated.timing(labelPosition, {
          toValue: 10,
          duration: 200,
          useNativeDriver: false,
        }),
        Animated.timing(labelFontSize, {
          toValue: 16,
          duration: 200,
          useNativeDriver: false,
        })
      ]).start();
    }

    const onSearch = useCallback(
      (text: string) => {
        if (text.length > 0) {
          const defaultFilterFunction = (e: any) => {
            const item = _.get(e, searchField || labelField)
              ?.toLowerCase()
              .replace(/\s/g, '')
              .normalize('NFD')
              .replace(/[\u0300-\u036f]/g, '');
            const key = text
              .toLowerCase()
              .replace(/\s/g, '')
              .normalize('NFD')
              .replace(/[\u0300-\u036f]/g, '');

            return item.indexOf(key) >= 0;
          };

          const propSearchFunction = (e: any) => {
            const labelText = _.get(e, searchField || labelField);

            return searchQuery?.(text, labelText);
          };

          const dataSearch = data.filter(
            searchQuery ? propSearchFunction : defaultFilterFunction
          );
          setListData(dataSearch);
        } else {
          setListData(data);
        }
      },
      [data, searchField, labelField, searchQuery]
    );

    // Metodo para verificar si se seleccionó una parte una opcion
    const onSelect = useCallback(
      (item: any) => {

        if (confirmSelectItem && onConfirmSelectItem) {
          return onConfirmSelectItem(item);
        }

        if (onChangeText) {
          setSearchText('');
          onChangeText('');
        }
        onSearch('');
        setFocused(false)
        setCurrentValue(item);
        onChange(item);
        eventClose();
      },
      [
        confirmSelectItem,
        eventClose,
        onChange,
        onChangeText,
        onConfirmSelectItem,
        onSearch,
      ]
    );

    const _renderDropdown = () => {
      const isSelected = currentValue !== null ? currentValue[valueField] : null;

      if (isSelected != null) {
        activarLabel()
      }

      // Renderiza el input
      return (
        <TouchableWithoutFeedback
          testID={testID}
          accessible={!!accessibilityLabel}
          accessibilityLabel={accessibilityLabel}
          onPress={showOrClose}
        >
          <View style={styles.dropdown}>
            {renderLeftIcon?.(visible)}
            <ThemedText
              style={[
                MatStyles.selectedItem,
                selectedTextStyle,
                font(),
              ]}
              {...selectedTextProps}
            >
              {isSelected !== null
                // Le indico que muestre la opcion seleccionada
                ? currentValue[labelField]
                : ""}
            </ThemedText>
            <Animated.Text
              style={[
                MatStyles.placeholder,
                { color: labelColor },
                focused && { color: fontColor },
                {
                  transform: [{ translateY: labelPosition }],
                  fontSize: labelFontSize,
                },
              ]}
            >
              {placeholder}
            </Animated.Text>
            {renderRightIcon ? (
              renderRightIcon(visible)
            ) : (
              <Image
                source={ic_down}
                style={StyleSheet.flatten([
                  styles.icon,
                  { tintColor: "gray" },
                  iconStyle,
                  focused && { tintColor: fontColor }
                ])}
              />
            )}
          </View>
        </TouchableWithoutFeedback>
      );
    };

    const _renderItem = useCallback(
      ({ item, index }: { item: any; index: number }) => {
        const isSelected = currentValue && currentValue[valueField];
        const selected = _.isEqual(item[valueField], isSelected);
        _.assign(item, { _index: index });

        // Renderiza el dropdown
        return (
          <TouchableHighlight
            key={index.toString()}
            testID={_.get(item, itemTestIDField || labelField)}
            accessible={!!accessibilityLabel}
            accessibilityLabel={_.get(
              item,
              itemAccessibilityLabelField || labelField
            )}
            style={{ backgroundColor: dropdownColor }}
            underlayColor={selectItemColor}
            onPress={() => onSelect(item)}
          >
            <View
              style={StyleSheet.flatten([
                itemContainerStyle,
                selected && {
                  backgroundColor: highlightColor,
                },
              ])}
            >
              {renderItem ? (
                renderItem(item, selected)
              ) : (
                <View style={styles.item}>
                  <ThemedText
                    style={StyleSheet.flatten([
                      styles.textItem,
                      itemTextStyle,
                      font(),
                    ])}
                  >
                    {item[labelField]}
                  </ThemedText>
                  {
                    selected && <MaterialCommunityIcons name='check' size={30} color={fontColor} />
                  }
                </View>
              )}
            </View>
          </TouchableHighlight>
        );
      },
      [
        accessibilityLabel,
        currentValue,
        font,
        itemAccessibilityLabelField,
        itemContainerStyle,
        itemTestIDField,
        itemTextStyle,
        labelField,
        onSelect,
        renderItem,
        valueField,
      ]
    );

    const renderSearch = useCallback(() => {
      if (search) {
        if (renderInputSearch) {
          return renderInputSearch((text) => {
            if (onChangeText) {
              setSearchText(text);
              onChangeText(text);
            }
            onSearch(text);
          });
        } else {
          return (
            <CInput
              testID={testID + ' input'}
              accessibilityLabel={accessibilityLabel + ' input'}
              style={[styles.input, inputSearchStyle]}
              inputStyle={[inputSearchStyle, font()]}
              value={searchText}
              autoCorrect={false}
              placeholder={searchPlaceholder}
              onChangeText={(e) => {
                if (onChangeText) {
                  setSearchText(e);
                  onChangeText(e);
                }
                onSearch(e);
              }}
              placeholderTextColor="gray"
              iconStyle={[{ tintColor: "gray" }, iconStyle]}
            />
          );
        }
      }
      return null;
    }, [
      accessibilityLabel,
      font,
      iconStyle,
      inputSearchStyle,
      onChangeText,
      onSearch,
      renderInputSearch,
      search,
      searchPlaceholder,
      testID,
      searchText,
    ]);

    const _renderList = useCallback(
      (isTopPosition: boolean) => {
        const isInverted = !inverted ? false : isTopPosition;

        const _renderListHelper = () => {
          return (
            <FlatList
              testID={testID + ' flatlist'}
              accessibilityLabel={accessibilityLabel + ' flatlist'}
              {...flatListProps}
              keyboardShouldPersistTaps="handled"
              ref={refList}
              onScrollToIndexFailed={scrollIndex}
              data={listData}
              inverted={isTopPosition ? inverted : false}
              renderItem={_renderItem}
              keyExtractor={(_item, index) => index.toString()}
              showsVerticalScrollIndicator={showsVerticalScrollIndicator}
            />
          );
        };

        return (
          <TouchableWithoutFeedback>
            <View style={styles.flexShrink}>
              {isInverted && _renderListHelper()}
              {renderSearch()}
              {!isInverted && _renderListHelper()}
            </View>
          </TouchableWithoutFeedback>
        );
      },
      [
        _renderItem,
        accessibilityLabel,
        flatListProps,
        listData,
        inverted,
        renderSearch,
        scrollIndex,
        showsVerticalScrollIndicator,
        testID,
      ]
    );

    const _renderModal = useCallback(() => {
      if (visible && position) {
        let { isFull, width, height, top, bottom, left } = position;

        top = top - 1.2
        width = width + 1

        const onAutoPosition = () => {
          if (keyboardHeight > 0) {
            return bottom < keyboardHeight + height;
          }

          return bottom < (search ? 150 : 100);
        };

        if (width && top && bottom) {
          const styleVertical: ViewStyle = {
            left: left,
            maxHeight: maxHeight,
            minHeight: minHeight,
          };
          const isTopPosition =
            dropdownPosition === 'auto'
              ? onAutoPosition()
              : dropdownPosition === 'top';

          let keyboardStyle: ViewStyle = {};

          let extendHeight = !isTopPosition ? top : bottom;
          if (
            keyboardAvoiding &&
            keyboardHeight > 0 &&
            isTopPosition &&
            dropdownPosition === 'auto'
          ) {
            extendHeight = keyboardHeight;
          }

          return (
            <Modal
              transparent
              statusBarTranslucent
              visible={visible}
              supportedOrientations={['landscape', 'portrait']}
              onRequestClose={showOrClose}
            >
              <TouchableWithoutFeedback onPress={showOrClose}>
                <View
                  style={StyleSheet.flatten([
                    styles.flex1,
                    isFull && styleContainerVertical,
                    backgroundColor && { backgroundColor: backgroundColor },
                    keyboardStyle,
                  ])}
                >
                  <View
                    style={StyleSheet.flatten([
                      styles.flex1,
                      !isTopPosition
                        ? { paddingTop: extendHeight }
                        : {
                          justifyContent: 'flex-end',
                          paddingBottom: extendHeight,
                        },
                      isFull && styles.fullScreen,
                    ])}
                  >
                    <View
                      style={StyleSheet.flatten([
                        MatStyles.optionContainer,
                        isFull ? styleHorizontal : styleVertical,
                        {
                          width,
                          borderColor: dropdownColor
                        },
                        containerStyle,
                      ])}
                    >
                      {_renderList(isTopPosition)}
                    </View>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </Modal>
          );
        }
        return null;
      }
      return null;
    }, [
      visible,
      search,
      position,
      keyboardHeight,
      maxHeight,
      minHeight,
      dropdownPosition,
      keyboardAvoiding,
      showOrClose,
      styleContainerVertical,
      backgroundColor,
      containerStyle,
      styleHorizontal,
      _renderList,
    ]);

    return (
      <View
        style={StyleSheet.flatten([
          styles.mainWrap, 
          style, 
          MatStyles.dropdown,
          { borderColor: borderColor, backgroundColor: bgColor },
          focused && { borderColor: fontColor, backgroundColor: bgColorFocus }
        ])}
        ref={ref}
        onLayout={_measure}
      >
        {_renderDropdown()}
        {_renderModal()}
      </View>
    );
  });

export default MatDropdown;
